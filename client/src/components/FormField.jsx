/**
 * A FormField component displays Label and Field.
 * 
 * @param {string} labelName, type, name, placeholder, value - Values for input tag 
 * @param {string} className - style from parent
 * @param {string} handleChange - Event handler for input>onChange 
 * @param {boolean} isSurpriseMe - If true, Displays button to get surprise prompt
 * @param {string} handleSurpriseMe -  Handler gets random string for the field
 * @returns jsx
 */

export default function FormField({labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe, className})
{
    return (
        <div className={className}>
            <div className="flex items-center gap-2 mb-2">
                <label
                    htmlFor={name}
                    className="block text-m font-medium"
                >
                    {labelName}
                </label>
                {isSurpriseMe && (
                    <button
                        type="button"
                        onClick={handleSurpriseMe}
                        className="font-semibold text-s px-2 rounded-[5px] border border-red-300 mx-5"
                    >
                        Surprise me
                    </button>
                )}
            </div>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required
                className="bg-black border-b border-[#0a6650] text-white p-2 rounded-md focus:outline-none w-full placeholder-white-400"/>
        </div>
    )
};