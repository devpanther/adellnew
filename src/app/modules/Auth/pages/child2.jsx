
import React from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';

import { Field } from '@progress/kendo-react-form';

import {
    FormInput, FormAutoComplete, FormRadioGroup,
    FormTextArea, FormDateInput
} from './form-components.jsx';

import {
    nameValidator, requiredValidator
} from './validators.jsx'

import {
    countries, genders
} from './data.jsx'

export const Child2 = (
    <div>
    <div className="text-center mb-10 mb-lg-20 mt-3">
            <p className="text-muted font-weight-bold">
                CHILD 2 (Optional)
            </p>
        </div>
    <Field
        key={'child2Name'}
        id={'child2Name'}
        name={'child2Name'}
        label={'Full Name'}
        component={FormInput}
    />
     <Field
            key={'child2Dob'}
            id={'child2Dob'}
            name={'child2Dob'}
            label={'Date Of Birth'}
            component={FormDateInput}
            validator={requiredValidator}
        />
    <Field
        key={'child2Gender'}
        id={'child2Gender'}
        name={'child2Gender'}
        label={'Gender'}
        layout={'horizontal'}
        component={FormRadioGroup}
        data={genders}
    />
   <Field
        key={'child2Hospital'}
        id={'child2Hospital'}
        name={'child2Hospital'}
        label={'Choice Of Hospital'}
        component={FormInput}
    />
    <Field
        key={'child2Medical'}
        id={'child2Medical'}
        name={'child2Medical'}
        label={'Medical Condition'}
        component={FormInput}
    />
    <Field
        key={'child2MobileNo'}
        id={'child2MobileNo'}
        name={'child2MobileNo'}
        label={'Telephone Number'}
        component={FormInput}
    />
</div>
);