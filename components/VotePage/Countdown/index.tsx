import React, { useState, useEffect } from 'react';
import { Box, Heading, HStack } from '@chakra-ui/react';

const CountdownToMidnight = () => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0); // Set to midnight of the current day

      const timeDiff = midnight - now;
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

      if (timeDiff <= 0) {
        clearInterval(intervalId);
        setCountdown('00:00:00'); // Countdown reached midnight
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box>
    <HStack>
      <Heading color='gray.500' fontSize="2xl">Next Vote in:  {countdown}</Heading>
    </HStack>
    </Box>
  );
};

export default CountdownToMidnight;
