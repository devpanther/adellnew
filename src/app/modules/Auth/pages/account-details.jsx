
import React, {useState} from 'react';

import { Field } from '@progress/kendo-react-form';
import { DatePicker } from '@progress/kendo-react-dateinputs';

import {
    genders
} from './data.jsx'

import {
    FormInput, FormDateInput, FormUpload, FormRadioGroup
} from './form-components.jsx';

import {
    userNameValidator, emailValidator, passwordValidator, requiredValidator
} from './validators.jsx'




export const AccountDetails = (
        <div>
            <Field
                key={'company'}
                id={'company'}
                name={'company'}
                label={'Company Name'}
                component={FormInput}
                validator={userNameValidator}
            />
            <Field
                key={'staffID'}
                id={'staffID'}
                name={'staffID'}
                label={'Staff ID/Number'}
                component={FormInput}
                validator={userNameValidator}
            />
            <Field
                key={'Surname'}
                id={'Surname'}
                name={'Surname'}
                label={'Enrollee Name: Surname'}
                component={FormInput}
                validator={userNameValidator}
            />
            <Field
                key={'firstName'}
                id={'firstName'}
                name={'firstName'}
                label={'First Name'}
                component={FormInput}
                validator={userNameValidator}
            />
            <Field
                key={'otherName'}
                id={'otherName'}
                name={'otherName'}
                label={'Other Name'}
                component={FormInput}
                validator={userNameValidator}
            />
            <Field
                key={'Religion'}
                id={'Religion'}
                name={'Religion'}
                label={'Religion'}
                component={FormInput}
                validator={userNameValidator}
            />
            <Field
                key={'dob'}
                id={'dob'}
                name={'dob'}
                label={'Date Of Birth'}
                component={FormDateInput}
                validator={requiredValidator}
            />
            <Field
                key={'Marital'}
                id={'Marital'}
                name={'Marital'}
                label={'Marital Status'}
                component={FormInput}
                validator={userNameValidator}
            />
            <Field
                key={'gender'}
                id={'gender'}
                name={'gender'}
                label={'Gender'}
                layout={'horizontal'}
                component={FormRadioGroup}
                data={genders}
                validator={requiredValidator}
            />
            <Field
                key={'email'}
                id={'email'}
                name={'email'}
                label={'Email'}
                hint={'Hint: Enter your personal email address.'}
                type={'email'}
                component={FormInput}
                validator={emailValidator}
            />
            <Field
                key={'password'}
                id={'password'}
                name={'password'}
                label={'Password'}
                type={'password'}
                component={FormInput}
                validator={passwordValidator}
            />
            
        </div>);

    