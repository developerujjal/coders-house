import React, { useState } from 'react';
import PhoneNumberInput from '../../components/Steps/PhoneNumberInput/PhoneNumberInput';
import StepCode from '../../components/Steps/SetpCode/StepCode';

const steps = {
    1: PhoneNumberInput,
    2: StepCode
}

const SignIn = () => {
    const [currentStep, setCurrentStep] = useState(1)

    const StepComponent = steps[currentStep];

    const onNext = () => {
        if (currentStep < 5) setCurrentStep(currentStep + 1);
    }


    return (
        <>
            <StepComponent onNext={onNext} />
        </>
    );
};

export default SignIn;