
import React from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';

import { Field } from '@progress/kendo-react-form';

import {
    FormInput, FormAutoComplete, FormRadioGroup,
    FormTextArea,FormDateInput
} from './form-components.jsx';

import {
    nameValidator, requiredValidator
} from './validators.jsx'

import {
    countries, genders
} from './data.jsx'

export const PaymentDetails = (
    <div>
        <div className="text-center mb-10 mb-lg-20 mt-3">
                <h3 className="font-size-h1">
                Dependents Details
                </h3>
                <p className="text-muted font-weight-bold">
                SPOUSE
                </p>
            </div>
        <Field
            key={'spouseName'}
            id={'spouseName'}
            name={'spouseName'}
            label={'Full Name'}
            component={FormInput}
            validator={nameValidator}
        />
         <Field
            key={'spouseDob'}
            id={'spouseDob'}
            name={'spouseDob'}
            label={'Date Of Birth'}
            component={FormDateInput}
            validator={requiredValidator}
        />
        <Field
            key={'spouseGender'}
            id={'spouseGender'}
            name={'spouseGender'}
            label={'Gender'}
            layout={'horizontal'}
            component={FormRadioGroup}
            data={genders}
            validator={requiredValidator}
        />
       <Field
            key={'spouseHospital'}
            id={'spouseHospital'}
            name={'spouseHospital'}
            label={'Choice Of Hospital'}
            component={FormInput}
            validator={nameValidator}
        />
        <Field
            key={'spouseMedical'}
            id={'spouseMedical'}
            name={'spouseMedical'}
            label={'Medical Condition'}
            component={FormInput}
            validator={nameValidator}
        />
        <Field
            key={'spouseOccupation'}
            id={'spouseOccupation'}
            name={'spouseOccupation'}
            label={'Occupation'}
            component={FormInput}
            validator={nameValidator}
        />
        <Field
            key={'spouseMobileNo'}
            id={'spouseMobileNo'}
            name={'spouseMobileNo'}
            label={'Telephone Number'}
            component={FormInput}
            validator={nameValidator}
        />
    </div>
);