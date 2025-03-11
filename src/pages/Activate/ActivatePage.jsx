import React, { useState } from 'react';
import StepName from '../../components/Steps/StepName/StepName';
import StepAvatar from '../../components/Steps/StepAvatar/StepAvatar';
import StepUsername from '../../components/Steps/StepUsername/StepUsername';

const steps = {
    1: StepName,
    2: StepAvatar,
    3: StepUsername
}


const ActivatePage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const CurrentComponent = steps[currentStep];

    const onNext = () => {
        setCurrentStep(currentStep + 1)
    }

    return (
        <>
            <CurrentComponent onNext={onNext} />
        </>
    );
};

export default ActivatePage;