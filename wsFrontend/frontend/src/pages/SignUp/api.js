import axios from "axios";
import { i18nInstance } from "../../locales";
import http from "../../lib/http";

export function signUp(body) {
    return http.post("/api/v1/users",body);
}