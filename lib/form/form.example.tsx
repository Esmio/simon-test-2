import * as React from 'react';
import Form, { FormValue } from './form'
import { useState, Fragment } from 'react';
import Validator, { noError } from './validator';
import Button from '../button/button';

const usernames = ['frank', 'jack', 'frankfrank', 'alice', 'bob'];
const checkUserName = (
    username: string,
    succeed: () => void,
    fail: () => void
) => {
    setTimeout(() => {
        console.log('我现在知道用户名是否存在');
        if (usernames.indexOf(username) >= 0) {
            succeed();
        } else {
            fail();
        }
    }, 3000)
}

const FormExample: React.FunctionComponent = () => {
    const [formData, setFormData] = useState<FormValue>({
        username: '',
        password: ''
    });
    const [fields] = useState([
        { name: 'username', label: '用户名', input: { type: 'text' } },
        { name: 'password', label: '密码', input: { type: 'password' } },
    ])
    const [errors, setErrors] = useState({});
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const rules = [
            { key: 'username', required: true },
            { key: 'username', minLength: 8, maxLength: 16 },
            {
                key: 'username', validator: {
                    name: 'unique',
                    validate(username: string): Promise<void> {
                        console.log('有人调用validator了！')
                        return new Promise((resolve, reject) => {
                            checkUserName(username, resolve, reject);
                        })
                    }
                }
            },
            { key: 'username', pattern: /^[A-Za-z0-9]+$/ },
            { key: 'password', required: true },
        ]
        Validator(formData, rules, (errors) => {
            setErrors(errors);
            if (noError(errors)) {
                console.log('no error')
            }
        });        
    }
    const transformError = (message: string) => {
        const map: any = {
            unique: 'username is taken',
            required: 'required',
            minLength: 'too short',
            maxLength: 'too long',
        };
        return map[message];
    }
    return (
        <div>
            <Form
                value={formData}
                fields={fields}
                buttons={
                    <Fragment>
                        <Button type="submit" level="important">提交</Button>
                        <Button>返回</Button>
                    </Fragment>
                }
                errors={errors}
                transformError={transformError}
                onSubmit={onSubmit}
                onChange={(newValue) => setFormData(newValue)}
            />
        </div>

    )
}

export default FormExample;
