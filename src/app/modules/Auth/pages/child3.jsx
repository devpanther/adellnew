
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

export const Child3 = (
    <div>
        <div className="text-center mb-10 mb-lg-20 mt-3">
                <p className="text-muted font-weight-bold">
                    CHILD 3 (Optional)
                </p>
            </div>
        <Field
            key={'child3Name'}
            id={'child3Name'}
            name={'child3Name'}
            label={'Full Name'}
            component={FormInput}
        />
         <Field
            key={'child3Dob'}
            id={'child3Dob'}
            name={'child3Dob'}
            label={'Date Of Birth'}
            component={FormDateInput}
            validator={requiredValidator}
        />
        <Field
            key={'child3Gender'}
            id={'child3Gender'}
            name={'child3Gender'}
            label={'Gender'}
            layout={'horizontal'}
            component={FormRadioGroup}
            data={genders}
        />
       <Field
            key={'child3Hospital'}
            id={'child3Hospital'}
            name={'child3Hospital'}
            label={'Choice Of Hospital'}
            component={FormInput}
        />
        <Field
            key={'child3Medical'}
            id={'child3Medical'}
            name={'child3Medical'}
            label={'Medical Condition'}
            component={FormInput}
        />
        <Field
            key={'child3MobileNo'}
            id={'child3MobileNo'}
            name={'child3MobileNo'}
            label={'Telephone Number'}
            component={FormInput}
        />
    </div>
);