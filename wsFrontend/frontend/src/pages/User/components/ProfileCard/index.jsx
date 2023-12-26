import defaultProfileImage from "../../../../assets/profile.png";
import { useAuthState } from "../../../../shared/state/context";
import { Button } from "../../../../shared/components/Button";
import { Alert } from "../../../../shared/components/Alert";
import { useState } from "react";
import { Input } from "../../../../shared/components/Input";
import { t } from "i18next";
import { updateUser } from "./api";

export function ProfileCard({ user }) {
  const authState = useAuthState();
  const [editMode, setEditMode] = useState(false);
  const isEditButtonVisible = !editMode && authState.id === user.id;
  const [newUsername, setNewUsername] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();

  const onChangeUsername = (event) => {
    setNewUsername(event.target.value);
    setErrors({});
  };

  const onClickSave = async () => {
    setErrors({});
    setGeneralError({});
    try {
      await updateUser(user.id, { username: newUsername });
      setEditMode(false)
    } catch (axiosError) {
      if (axiosError.response?.data) {
        if (axiosError.response.data.status === 400) {
          setErrors(axiosError.response.data.validationErrors);
        } else {
          setGeneralError(axiosError.response.data.message);
        }
      } else {
        setGeneralError(t("genericError"));
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header text-center">
        <img
          src={defaultProfileImage}
          width={200}
          className="img-fluid rounded-circle shadow-sm"
        />
      </div>
      <div className="card-body text-center">
        {!editMode && <span className="fs-3 d-block">{user.username}</span>}
        {isEditButtonVisible && (
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        )}
        {editMode && (
          <>
            <Input
              defaultValue={user.username}
              label={t("username")}
              onChange={onChangeUsername}
              error={errors.username}
            />
            {generalError && <Alert styleType="danger">{generalError}</Alert>}

            <Button onClick={() => onClickSave()}>Save</Button>
            <div className="d-inline m-1 "></div>
            <Button
              styleType="outline-secondary"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
