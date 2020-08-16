import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import  { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Form, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { Stepper } from '@progress/kendo-react-layout';
import { AccountDetails } from './account-details.jsx';
import { PersonalDetails } from './personal-details.jsx';
import { PaymentDetails } from './payment-details.jsx';
import { Upload } from '@progress/kendo-react-upload';
import Fab from '@material-ui/core/Fab';
import firebase from '../../config/fbConfig'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Child } from './child.jsx';
import { Child2 } from './child2.jsx';
import { Child3 } from './child3.jsx';
import { Child4 } from './child4.jsx';

let stepPages = [
    AccountDetails,
    PersonalDetails];

const fileStatuses = [
    'UploadFailed',
    'Initial',
    'Selected',
    'Uploading',
    'Uploaded',
    'RemoveFailed',
    'Removing'
];

const FormStep = () => {
    const [files, setFiles] = useState([])
    const [events, setEvents] = useState([])
    const [filePreviews, setPreviews] = useState({})
    const [type, setType] = useState('individual')
    const [color, setColor] = useState('secondary')
    const [color2, setColor2] = useState('gray')
    let history = useHistory();
    const [step, setStep] = React.useState(0);
    const [formState, setFormState] = React.useState({});
    const [steps, setSteps] = React.useState([
        { isValid: undefined },
        { isValid: undefined },
    ]);

    const onAdd = (event) => {
        const afterStateChange = () => {
            event.affectedFiles
                .filter(file => !file.validationErrors)
                .forEach(file => {
                    const reader = new FileReader();

                    reader.onloadend = (ev) => {
                        setPreviews({...filePreviews,
                            [file.uid]: ev.target.result})
                    };

                    reader.readAsDataURL(file.getRawFile());
                });
        };

            setFiles(event.newState)
            setEvents([...events,
                `File selected: ${event.affectedFiles[0].name}`])
            afterStateChange()
    }

    const onRemove = (event) => {
        const filePreviews = {
            ...filePreviews
        };

        event.affectedFiles.forEach(file => {
            delete filePreviews[file.uid];
        });

        setFiles(event.newState)
        setEvents([...events,
            `File removed: ${event.affectedFiles[0].name}`])
            setPreviews(filePreviews)
    }

    const onProgress = (event) => {
        setFiles(event.newState)
        setEvents([...events,
            `On Progress: ${event.affectedFiles[0].progress} %`])
    }

    const onStatusChange = (event) => {
        const file = event.affectedFiles[0];
        setFiles(event.newState)
        setEvents([
            ...events,
            `File '${file.name}' status changed to: ${fileStatuses[file.status]}`
        ])
    }

    const handleIndividualClick = () => {
        setType('individual')
        setColor('secondary')
        setColor2('gray')
        stepPages = [
            AccountDetails,
            PersonalDetails,
        ];
        setSteps([
            { isValid: undefined },
            { isValid: undefined },
        ])
      }

    const handleFamilyClick = () => {
        setType('family')
        setColor2('secondary')
        setColor('gray')
        stepPages = [
            AccountDetails,
            PersonalDetails,
            PaymentDetails,
            Child,
            Child2,
            Child3,
            Child4,
        ];
        setSteps([
            { isValid: undefined },
            { isValid: undefined },
            { isValid: undefined },
            { isValid: undefined },
            { isValid: undefined },
            { isValid: undefined },
            { isValid: undefined },
        ])
    }

    const lastStepIndex = steps.length - 1;
    const isLastStep = lastStepIndex === step;

    const onStepSubmit = React.useCallback(
        (event) => {
            const { isValid, values } = event;

            const currentSteps = steps.map((currentStep, index) => ({
                ...currentStep,
                isValid: index === step ? isValid : currentStep.isValid
            }));

            setSteps(currentSteps);

            if (!isValid) {
                return;
            }

            setStep(() => Math.min(step + 1, lastStepIndex));
            setFormState(values);

            
            var storageRef = firebase.storage().ref();

            // Create a reference to 'mountains.jpg'
            var photoRef = storageRef.child(`images/Photo-for-${values.firstName}-${values.Surname}.jpg`);

            

            if (isLastStep) {
                Object.keys(filePreviews)
                .map((fileKey) => (
                    photoRef.putString(filePreviews[fileKey], 'data_url').then(function(snapshot) {
                        console.log('Uploaded PDF');
                    })
                ))
                history.push({
                    pathname:"/auth/pdf",
                    state:{
                        key: values,
                        type: type
                     }
                });
            }
        },
        [steps, isLastStep, step, lastStepIndex, filePreviews, history, type]
    );

    const onPrevClick = React.useCallback(
        (event) => {
            event.preventDefault();
            setStep(() => Math.max(step - 1, 0));
        },
        [step, setStep]
    );
    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: "80%" }}>
            <generatePDF/>
             <div className="text-center mb-10 mb-lg-20">
                <h3 className="font-size-h1">
                    Get On Board
                </h3>
                <p className="text-muted font-weight-bold">
                    Your Passport to a Great Healthcare
                </p>
                <Fab variant="extended" color={color} aria-label="Add" style={{margin: '1px'}} onClick={handleIndividualClick}>
                <PermIdentityIcon style={{marginRight: '15px'}}/>
                Individual
                </Fab>
                <Fab variant="extended" color={color2} aria-label="Add" style={{margin: '10px'}} onClick={handleFamilyClick}>
                <SupervisorAccountIcon style={{marginRight: '15px'}}/>
                Family
                </Fab>
            </div>
            <Stepper value={step} items={steps} />
            <Form
                initialValues={formState}
                onSubmitClick={onStepSubmit}
                render={(formRenderProps) => (
                    <div>
                        <FormElement>
                            {stepPages[step]}
                            {step === 0 ? <div>
                                            <p className="mt-3">Upload Passport</p>
                                            <Upload
                                                batch={false}
                                                multiple={true}
                                                files={files}
                                                onAdd={onAdd}
                                                onRemove={onRemove}
                                                onProgress={onProgress}
                                                onStatusChange={onStatusChange}
                                                withCredentials={false}
                                                saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                                                removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
                                            />
                                            {
                                                files.length ?
                                                <div className={'img-preview example-config'}>
                                                    <h3>Preview selected images</h3>
                                                    {
                                                        Object.keys(filePreviews)
                                                            .map((fileKey) => (<img
                                                                src={filePreviews[fileKey]}
                                                                alt={'image preview'}
                                                                style={{ width: 200, margin: 10 }}
                                                            />))
                                                    }
                                                </div> : undefined
                                            }
                                        </div> : null}
                            <div className="mt-5" style={{fontWeight: 'bold'}}>
                                <a href="https://mail-attachment.googleusercontent.com/attachment/u/0/?ui=2&ik=e046d1e279&jsver=tc8zJC5MxZU.en_GB.&cbl=gmail_fe_200807.12_p5&view=att&th=%23msg-f:1674832550153405442&disp=zip&permmsgid=msg-f:1674832550153405442&saddbat=ANGjdJ-ImQLpbaTPh2aASMOv47UjRGGcTnJEHLA78-KQjzYXdyil7Z57DHmbanvzzKPzO2iz6sMfr-gTIrSANTWWB8UhCwlfbwXJoo81sl2Ee8dT-5tH-X5SouV4-2zYSHrbyrapeUrfhrKsl1m4HQA1x5E36GKQyymz5ozmt0lCBR-kjOkKxvfktWO4Lprhgb8OjavpyUZSGMTtD2HUHqNjQxzyiimA4gA6oEoN5Erz-s1KwQX0XJH3pdJWKXY2Hp1eGIgafB9Q-8x9JAPcmxABH33LDpBMSm0r3bBm54zCcFEW4_IjxLGLiQ3JoBmR1iKDcRuZLw0LYHAIpBQYPem6NK8fzqK15CTud4eiY2rSWLikvlKMnSnQ4r3ZryPpQnCL7XwfHbqFwCcoOOEsUIN2B641OEquOx92G8AW-45RueYyZ-q5EFXogJqkGOifbOnCg7qDC5jMqo9mrPOn1DmfYKCKVtA1vL97kdgFRCkCHJPtJQwc52FL87owgw6Gl-EcSfroxUf6qM0yAh-vYZ1S59-jNr2vuB68FBnfff7QJmv04o-pm5cPF7pvOSCnqGbiu64bJ4s5FKI1j6ovL8kyShT6zuXBYCTRf5xni2f2e9tjeuquedMsRGfcqLI2Ff4bW6zeARGyMPpQ4adMpRMPQixAGFfYZkMbMUpjXYwmaonqUAg146vJAZoEbT0" download>
                                    <p style={{cursor: 'pointer'}}>Download List Of Hospitals</p>
                                </a>
                                <a href="https://mail-attachment.googleusercontent.com/attachment/u/0/?ui=2&ik=e046d1e279&jsver=tc8zJC5MxZU.en_GB.&cbl=gmail_fe_200807.12_p5&view=att&th=%23msg-f:1674830643477586070&disp=zip&permmsgid=msg-f:1674830643477586070&saddbat=ANGjdJ-GrCffZXzP1-CEICPec56QXhcO9GORW7KNeNdtX4YmHO0KlGCiCQP5YpWbV26PCcu6REM0Zs6ey2Z3DgXxviWcv5eXja0uPoRXSjKFvkPPGe7dsArmLhAUwozSoO1RTDNTXcqBQc8eJbbD3z5woV-9bidtO-FncOhMmebA59tlYv01BFIzgNyIjAhWaL6TGGI5NS6S9KhY_1htdNSCh_M0agCS3XX8XPXJqS4BgG7dEgSzhheYC_NLpNJe9u0ieUgnj1IkdDGpfrqbZOIylsCMAV1MtmcAU1weLuTyn29q7Y7H79j0suNtSsjOzjtOXFgjD_CUmeD5yIedekUYUb_DNGlBQsLvi-LjR8kimWrGWi9F6Op1knMAJJtNwC-KpqCRzFIds_jvfHHxqd_TUNlSTLo1z3fZAppeI5pRrLkR4XhR0MrspWY7NEH25wyeNd18Lg2U68M5pRAf31pmW3TbX4KgmjJj5VLJP-4lFNTKr6-qtAPIvcmZ-Pa59pnXdHCtSjosiBr2xeiEXi1DrORHfWMpBgAwnhZ_99NvYiHLG1sL45Sy6D5NPkr27qDOIdTa3wpmsx0R5g56I_6fidooC6wEm-H9e6LmraUfXt_BTZzMRuHNe-pJcoTmShEyC2ePL4n4H2rawRll8-7GFYuMZmmkwUc7bg62MJyCaL95a3njJBKDMk_DI2k" download>
                                    <p style={{cursor: 'pointer'}}>Download Plan List</p>
                                </a>
                            </div>
                            <span style={{ marginTop: '40px' }} className={'k-form-separator'} />
                            <div
                                style={{ justifyContent: 'space-between', alignContent: 'center' }}
                                className={'k-form-buttons k-buttons-end'}
                            >
                                <span>Step {step + 1} of 3</span>
                                <div>
                                    {
                                        step !== 0 ? (
                                            <Button style={{ marginRight: '16px' }} onClick={onPrevClick}>
                                                Previous
                                            </Button>
                                        ) : undefined
                                    }
                                    <Button
                                        primary={true}
                                        disabled={!formRenderProps.allowSubmit}
                                        onClick={formRenderProps.onSubmit}
                                    >
                                        {isLastStep ? 'Submit' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </FormElement>
                    </div>
                )}
            />
        </div>
    );
};

export default FormStep