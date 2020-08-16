
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

export const Child = (
    <div>
        <div className="text-center mb-10 mb-lg-20 mt-3">
                <p className="text-muted font-weight-bold">
                    CHILD 1 (Optional)
                </p>
            </div>
        <Field
            key={'childName'}
            id={'childName'}
            name={'childName'}
            label={'Full Name'}
            component={FormInput}
        />
         <Field
            key={'childDob'}
            id={'childDob'}
            name={'childDob'}
            label={'Date Of Birth'}
            component={FormDateInput}
            validator={requiredValidator}
        />
        <Field
            key={'childGender'}
            id={'childGender'}
            name={'childGender'}
            label={'Gender'}
            layout={'horizontal'}
            component={FormRadioGroup}
            data={genders}
        />
       <Field
            key={'childHospital'}
            id={'childHospital'}
            name={'childHospital'}
            label={'Choice Of Hospital'}
            component={FormInput}
        />
        <Field
            key={'childMedical'}
            id={'childMedical'}
            name={'childMedical'}
            label={'Medical Condition'}
            component={FormInput}
        />
        <Field
            key={'childMobileNo'}
            id={'childMobileNo'}
            name={'childMobileNo'}
            label={'Telephone Number'}
            component={FormInput}
        />
    </div>
);