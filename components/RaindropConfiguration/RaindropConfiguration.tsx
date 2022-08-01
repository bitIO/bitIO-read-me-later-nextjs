import { useState } from 'react';

import { Button, Group, Stepper } from '@mantine/core';

import RaindropConfigurationCollections from './RaindropConfigurationCollections';

function RaindropConfiguration() {
  const [active, setActive] = useState(0);
  const nextStep = () => {
    return setActive((current) => {
      return current < 3 ? current + 1 : current;
    });
  };
  const prevStep = () => {
    return setActive((current) => {
      return current > 0 ? current - 1 : current;
    });
  };

  return (
    <>
      <Stepper active={active} breakpoint="sm" onStepClick={setActive}>
        <Stepper.Step
          description="Select collections from Raindrop.io"
          label="Collections"
        >
          {active === 0 && <RaindropConfigurationCollections />}
        </Stepper.Step>
        <Stepper.Step description="Verify email" label="Second step">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step description="Get full access" label="Final step">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group mt="xl" position="center">
        <Button onClick={prevStep} variant="default">
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}

export default RaindropConfiguration;
