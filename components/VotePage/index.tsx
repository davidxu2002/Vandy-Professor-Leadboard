import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  HStack,
  FormLabel,
  Center,
  VStack,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useToast,
  Text,
  useColorModeValue,
  Collapse
} from '@chakra-ui/react';
import {InstantSearch} from "react-instantsearch";
import searchClient, {professorIndex} from '@/algolia/index';
import ProfessorMenu from '../Home/Utilities/FormComponents/ProfessorMenu';
import { updateProfVote } from '@/services/professorVotes';
import { VoteStatus } from '@/types/Vote';
import ProfVoteDisplay from './ProfVoteDisplay/index';
import useAuth from '@/hooks/useAuth';
import CountdownToMidnight from './Countdown/index';

interface VotePageProps {
    totalVotes: number,
    dailyStreak: number,
    uniqueProfessorsVoted: number,
    mostProfessorVotes: number,
    mostVotedProfessor: string,
}
export default function VotePage(props: VotePageProps) {
   // TODO: we need some kind of useFeed thing here that retrieves the data for a certain user data
   // For now we're just going to manually increment it
    // const {totalVotes, dailyStreak, uniqueProfessorsVoted, mostProfessorVotes, mostVotedProfessor} = props;

    // All of this is just for demo - deleted after once the backend is setup
    const [totalVotes, setTotalVotes] = useState(9);
    const [dailyStreak, setDailyStreak] = useState(2);
    const [uniqueProfessorsVoted, setUniqueProfessorsVoted] = useState(5);
    const [mostProfessorVotes, setMostProfessorVotes] = useState(5);
    const [mostVotedProfessor, setMostVotedProfessor] = useState("Elvira Aballi Morell");

    const [professor, setProfessor] = useState(null);
    // TODO: delay voting 24hours
    const [dailyVote, setDailyVote] = useState(false);

    // TODO: Expand out professor details
    const [show, setShow] = useState(false)
    // Handle notif popup for votes
    const toast = useToast()

    // Define background color for hover
    const hoverBgColor = useColorModeValue("gray.50", "gray.300"); 
    const { user, loading } = useAuth();

    useEffect(() => {
        // Retrieve professor data
        if (professor === null) {
            setShow(false);
        }
        else {
            setShow(true);
        }
      }, [professor]);

    // Function to handle voting
    const handleVote = (voteType: string) => {
      // Logic to cast vote for the selected professor
      if (professor !== null) {
        updateProfVote(professor.id, 'a', voteType === 'upvote' ? VoteStatus.UPVOTED : VoteStatus.DOWNVOTED);
      }
      toast({
        title: 'Vote submitted',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      setTotalVotes(totalVotes + 1);
      setMostProfessorVotes(mostProfessorVotes + 1);
      // Disable voting until 
      setDailyVote(true);
      setProfessor(null);
    };

    return (
        <>
    <Box w="100%" mt={4}>
      <Box 
        borderWidth="1px" 
        borderRadius="lg" 
        bg="white" 
        p={6} 
        >
              {dailyVote && <CountdownToMidnight/>}
              {!dailyVote && <Text fontSize="2xl" fontWeight="bold" color="black">Daily Vote</Text>}

            <InstantSearch 
              searchClient={searchClient} 
              indexName={professorIndex}>
              <ProfessorMenu
                  professor={professor}
                  setProfessor={setProfessor}
              />
              </InstantSearch>
              {/* TODO: feed data in and display it */}
          {/* <Collapse startingHeight={0} in={show}>
              {professor !== null ? (<ProfVoteDisplay
                  professorData={professorData}/>) : (<></>)
              }
          </Collapse> */}
          <Box mt={4} textAlign="center">
          <Button 
              onClick={() => handleVote("upvote")} 
              colorScheme="teal" 
              color='white'
              bg='green.400'
              size="md"
              borderRadius="md" // Rounded corners
              boxShadow="md" // Add shadow effect
              _hover={{ bg: 'green.300' }} // Apply hover effect
              isDisabled={professor === null || dailyVote === true} // Disable button if state is null
          >
              Upvote
          </Button>
          <Button 
              onClick={() => handleVote("downvote")} 
              colorScheme="teal" 
              color='white'
              bg='red.400'
              size="md"
              borderRadius="md" // Rounded corners
              boxShadow="md" // Add shadow effect
              _hover={{ bg: 'red.300' }} // Apply hover effect
              ml={2} // Add margin top for spacing
              isDisabled={professor === null || dailyVote === true} // Disable button if state is null
          >
              Downvote
          </Button>
        </Box>
      </Box>
      <Box borderWidth="1px" borderRadius="lg" bg="white" p={6} mt={4}>
      <VStack spacing={6} align="stretch">
        <Text fontSize="xl" fontWeight="bold" color="black">User Vote Statistics</Text>
        <VStack spacing={4} align="stretch">
        <Divider/>
          <Box
            // borderWidth="1px"
            borderRadius="lg"
            bg="white"
            p={4}
            _hover={{ bg: hoverBgColor, cursor: "pointer" }} // Apply hover effect
            transition="background-color 0.2s"
          >
            
            <Stat>
              <StatLabel>You&apos;ve cast <b>{totalVotes} votes</b></StatLabel>
              <StatHelpText></StatHelpText>
            </Stat>
          </Box>
          <Divider/>
          <Box
            // borderWidth="1px"
            borderRadius="lg"
            bg="white"
            p={4}
            _hover={{ bg: hoverBgColor, cursor: "pointer" }} // Apply hover effect
            transition="background-color 0.2s"
          >
            <Stat>
              <StatLabel>You&apos;ve voted for <b>{uniqueProfessorsVoted}</b> different professors</StatLabel>
              <StatHelpText></StatHelpText>
            </Stat>
          </Box>
          <Divider/>

          <Box
            // borderWidth="1px"
            borderRadius="lg"
            bg="white"
            p={4}
            _hover={{ bg: hoverBgColor, cursor: "pointer" }} // Apply hover effect
            transition="background-color 0.2s"
          >
            <Stat>
              <StatLabel>Your current voting streak is <b>{dailyStreak} days</b></StatLabel>
              <StatHelpText></StatHelpText>
            </Stat>
          </Box>
          <Divider/>

          <Box
            // borderWidth="1px"
            borderRadius="lg"
            bg="white"
            p={4}
            _hover={{ bg: hoverBgColor, cursor: "pointer" }} // Apply hover effect
            transition="background-color 0.2s"
          >
            <Stat>
              <StatLabel>You&apos;ve voted the most for <b>{mostVotedProfessor}</b> ({mostProfessorVotes} votes)</StatLabel>
              <StatHelpText></StatHelpText>
            </Stat>
          </Box>
          <Divider/>

        </VStack>
        
      </VStack>
    </Box>
    </Box>
    </>
    );
}
  