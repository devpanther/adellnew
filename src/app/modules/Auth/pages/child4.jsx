
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

export const Child4 = (
    <div>
        <div className="text-center mb-10 mb-lg-20 mt-3">
                <p className="text-muted font-weight-bold">
                    CHILD 4 (Optional)
                </p>
            </div>
        <Field
            key={'child4Name'}
            id={'child4Name'}
            name={'child4Name'}
            label={'Full Name'}
            component={FormInput}
        />
         <Field
            key={'child4Dob'}
            id={'child4Dob'}
            name={'child4Dob'}
            label={'Date Of Birth'}
            component={FormDateInput}
            validator={requiredValidator}
        />
        <Field
            key={'child4Gender'}
            id={'child4Gender'}
            name={'child4Gender'}
            label={'Gender'}
            layout={'horizontal'}
            component={FormRadioGroup}
            data={genders}
        />
       <Field
            key={'child4Hospital'}
            id={'child4Hospital'}
            name={'child4Hospital'}
            label={'Choice Of Hospital'}
            component={FormInput}
        />
        <Field
            key={'child4Medical'}
            id={'child4Medical'}
            name={'child4Medical'}
            label={'Medical Condition'}
            component={FormInput}
        />
        <Field
            key={'child4MobileNo'}
            id={'child4MobileNo'}
            name={'child4MobileNo'}
            label={'Telephone Number'}
            component={FormInput}
        />
    </div>
);