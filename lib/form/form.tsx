import * as React from 'react';

export interface FormValue {
    [K: string]: any
}

interface Props {
    value: FormValue;
    fields: Array<{ name: string; label: string; input: { type: string } }>;
    buttons: React.ReactFragment;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onChange: (value: FormValue) => void;
}

const Form: React.FunctionComponent<Props> = (props) => {
    const formData = props.value;
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        props.onSubmit(e);
    }
    const onInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(name, e.target.value)
        const newFormValue = {...formData, [name]: e.target.value}
        props.onChange(newFormValue)
    }
    return (
        <form onSubmit={onSubmit}>
            {props.fields.map(f => 
                <div key={f.name}>
                    {f.label}
                    <input type={f.input.type} value={formData[f.name]}
                        onChange={onInputChange.bind(null, f.name)}
                    />
                </div>
            )}
            <div>
                {props.buttons}
            </div>
        </form>
    )
}

export default Form;
