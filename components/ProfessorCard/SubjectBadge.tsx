// import React from 'react';

// import {Badge, Button, HStack} from "@chakra-ui/react";

// import {Review} from "@/types/Subject";
// import {Professor} from "@/types/Professor";

// interface Props {
//     review: Review,
//     setCourseId?: (courseId: string | null) => void,
//     setProfessor?: (professor: Professor | null) => void,
// }

// const ReviewBadges: React.FC<Props> = ({ review, setCourseId, setProfessor}) => {

//     const courseId = review.courseId.replace("_", " ").toUpperCase().substring(0, 10);
//     const professorName = review.professor.name.substring(0, 10);

//     return (
//         <HStack>
//             {
//                 setCourseId ? (
//                     <Button
//                         colorScheme={'green'}
//                         size='xs'
//                         variant='outline'
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             setCourseId(review.courseId)
//                         }}
//                     >
//                         {courseId}
//                     </Button>
//                 ) : (
//                     <Badge
//                         colorScheme={'green'}
//                         size = 'xs'
//                     >
//                         {courseId}
//                     </Badge>
//                 )
//             }
//             {
//                 setProfessor ? (
//                     <Button
//                         colorScheme={'blue'}
//                         size='xs'
//                         variant='outline'
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             setProfessor(review.professor)
//                         }}
//                     >
//                         {professorName}
//                     </Button>
//                 ) : (
//                     <Badge
//                         colorScheme={'blue'}
//                         size = 'xs'
//                     >
//                         {professorName}
//                     </Badge>
//                 )
//             }
//         </HStack>
//     );
// };

// export default ReviewBadges;
