import * as React from 'react';
import Input from '../input/input';
import classes from '../helpers/classes';
import './form.scss';

export interface FormValue {
    [K: string]: any
}

interface Props {
    value: FormValue;
    fields: Array<{ name: string; label: string; input: { type: string } }>;
    buttons: React.ReactFragment;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onChange: (value: FormValue) => void;
    errors: { [K: string]: string[] };
    errorsDisplayMode?: 'first' | 'all';
}

const Form: React.FunctionComponent<Props> = (props) => {
    const formData = props.value;
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        props.onSubmit(e);
    }
    const onInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(name, e.target.value)
        const newFormValue = { ...formData, [name]: e.target.value }
        props.onChange(newFormValue)
    }
    return (
        <form onSubmit={onSubmit}>
            <table className="sui-form-table">
                <tbody>
                {props.fields.map(f =>
                    <tr className={classes('sui-form-tr')} key={f.name}>
                        <td className="sui-form-td">
                            <span className="sui-form-label">{f.label}</span>
                        </td>
                        <td className="sui-form-td">
                            <Input 
                                className="sui-form-input"
                                type={f.input.type} 
                                value={formData[f.name]}
                                onChange={onInputChange.bind(null, f.name)}
                            />
                            <div className="sui-form-error">
                                {
                                    props.errors[f.name] ?
                                    props.errorsDisplayMode === 'first' ?
                                    props.errors[f.name][0] :
                                    props.errors[f.name].join('，') :
                                    <span>&nbsp;</span>

                                }
                            </div>
                        </td>
                    </tr>
                )}
                <tr className="sui-form-tr">
                    <td className="sui-form-td"/>
                    <td className="sui-form-td">
                        {props.buttons}
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    )
}

Form.defaultProps = {
    errorsDisplayMode: 'first'
}

export default Form;
