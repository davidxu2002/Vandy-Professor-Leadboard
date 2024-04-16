import React, { useState } from 'react';
import { Box, VStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Layout from '@/components/Layout/index';

const ProfessorsPage = () => {
    // Dummy data for the demo
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (index) => {
        setSelectedTab(index);
    };

    return (
        <Layout>
            <Box w="100%" mt={4}>
                <Box borderWidth="1px" borderRadius="lg" bg="white" p={6} mt={4}>
                    <VStack spacing={6} align="stretch">
                        <Text fontSize="l" fontWeight="bold" color="black">Leaderboard Statistics</Text>
                        <Tabs colorScheme="blue" onChange={handleTabChange} defaultIndex={selectedTab}>
                            <TabList>
                                <Tab>Overall</Tab>
                                <Tab>Daily</Tab>
                                {/* <Tab>Top Professors</Tab> */}
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>Stat</Th>
                                                <Th>Value</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td>Total Votes Cast</Td>
                                                <Td>157</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Unique Voters</Td>
                                                <Td>2</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Number of Professors Voted</Td>
                                                <Td>9</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Highest Voted Professor</Td>
                                                <Td>Elvira Aballi Morell (212 votes)</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Highest Voted Subject</Td>
                                                <Td>Spanish</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TabPanel>
                                <TabPanel>
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>Stat</Th>
                                                <Th>Value</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td>Total Votes Cast</Td>
                                                <Td>3</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Unique Voters</Td>
                                                <Td>1</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Number of Professors Voted</Td>
                                                <Td>2</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Highest Voted Professor</Td>
                                                <Td>Elvira Aballi Morell (13 votes)</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Highest Voted Subject</Td>
                                                <Td>Spanish</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TabPanel>
                                <TabPanel>
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>Stat</Th>
                                                <Th>Value</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td>Top 5 Voted Professors</Td>
                                                <Td>List of professors</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Percentage of Total Votes</Td>
                                                <Td>Percentages</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Top Department</Td>
                                                <Td>Department name</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Top Discipline</Td>
                                                <Td>Discipline name</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Votes Distribution by Course</Td>
                                                <Td>Course distribution</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </VStack>
                </Box>
            </Box>
        </Layout>
    );
};

export default ProfessorsPage;
