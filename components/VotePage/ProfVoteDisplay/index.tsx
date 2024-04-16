import { Professor } from "@/types/Professor";
import Comments from "@/components/Home/Comments/index";
import WriteComment from "@/components/Home/Comments/WriteComment";
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from '@chakra-ui/react'

interface Props {
    professorData: Professor;
}
const ProfVoteDisplay: React.FC<Props> = ({ professorData }) => {
    return (
        <>
    <StatGroup>
        <Stat>
            <StatLabel>Current Place</StatLabel>
            <StatNumber>{professorData.current_place}</StatNumber>
        </Stat>
        <Stat>
            <StatLabel>Percentile</StatLabel>
            <StatNumber>{((1 - (professorData.current_place / 1043)) * 100).toFixed(2)}%</StatNumber>
        </Stat>

        <Stat>
            <StatLabel>Vote Change (24hrs) </StatLabel>
            <StatNumber>{ professorData.votes - professorData.day_start?.score}</StatNumber>
            <StatHelpText>
            <StatArrow type={professorData.votes - professorData.day_start?.score >= 0 ? 'increase' : 'decrease'} />
            </StatHelpText>
        </Stat>

        <Stat>
            <StatLabel>Place Change (24hrs)</StatLabel>
            <StatNumber>{professorData.current_place - professorData.day_start?.place}</StatNumber>
            <StatHelpText>
            <StatArrow type={professorData.current_place - professorData.day_start?.place >= 0 ? 'increase' : 'decrease'} />
            </StatHelpText>
        </Stat>

    </StatGroup>
    <WriteComment reviewId={professorData.id} />
                <Comments
                    reviewId={professorData.id}
                />
    </>

    );
}

export default ProfVoteDisplay;