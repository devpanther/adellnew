
import React from 'react';

import { Field } from '@progress/kendo-react-form';

import {
    FormInput, FormAutoComplete, FormRadioGroup,
    FormTextArea
} from './form-components.jsx';

import {
    nameValidator, requiredValidator
} from './validators.jsx'

import {
    countries, genders
} from './data.jsx'

export const PersonalDetails = (
    <div>
        <Field
            key={'job'}
            id={'job'}
            name={'job'}
            label={'Job Title'}
            component={FormInput}
            validator={nameValidator}
        />
        <Field
            key={'Address'}
            id={'Address'}
            name={'Address'}
            label={'Residential Address'}
            component={FormInput}
            validator={nameValidator}
        />
        <Field
            key={'mobileNo1'}
            id={'mobileNo1'}
            name={'mobileNo1'}
            label={'Mobile No: (1)'}
            component={FormInput}
            validator={nameValidator}
        />
        <Field
            key={'mobileNo2'}
            id={'mobileNo2'}
            name={'mobileNo2'}
            label={'Mobile No: (2)'}
            component={FormInput}
            validator={nameValidator}
        />
        <Field
            key={'Genotype'}
            id={'Genotype'}
            name={'Genotype'}
            label={'Genotype & Blood Group'}
            component={FormInput}
            validator={nameValidator}
        />
        <Field
            key={'medical'}
            id={'medical'}
            name={'medical'}
            label={'Medical Condition'}
            component={FormInput}
            validator={nameValidator}
        />
        <Field
            key={'Hospital'}
            id={'Hospital'}
            name={'Hospital'}
            label={'Choice Of Hospital'}
            component={FormInput}
            validator={nameValidator}
        />
    </div>
);