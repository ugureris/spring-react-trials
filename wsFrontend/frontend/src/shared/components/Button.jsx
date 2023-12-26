export function Button({disabled, children, onClick, styleType = 'primary'}){
    return (<button
        className={`btn btn-${styleType}`}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
      )
}