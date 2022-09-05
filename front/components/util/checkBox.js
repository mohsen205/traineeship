const CheckBox = ({ value, id, clickHandler, checked }) => {
    return (
        <div className="form-check">


            <input
                type="checkbox"
                className="form-check-input" name="collection" id={id}
                value={id}
                onChange={clickHandler}
                checked={checked}
            />

            <label className="form-check-label" htmlFor={id}>
                {value}
            </label>
        </div>
    )
}
export default CheckBox