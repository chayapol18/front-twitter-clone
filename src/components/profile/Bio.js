import { Flex, Text, Box, Image, Avatar, Button, IconButton, Stack, HStack, Input, Link, Tabs, TabList, TabPanels, Tab, TabPanel, Icon, FormControl, FormLabel, } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { useContext, useEffect, useState } from 'react';
import { CalendarIcon } from '@chakra-ui/icons'
import { AuthContext } from '../../contexts/AuthContextProvider';
import axios from '../../config/axios'
import { useHistory } from 'react-router-dom'

const EditProfileModal = ({ user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
        <Button onClick={onOpen} mt='15px' bgColor='white' border='solid 1px' borderRadius='full' color='blue.400'>
            Edit Profile
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>
                <Text fontWeight='700'>Edit your profile</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                    <Stack spacing={3}>
                        <Image src={user.backgroundImg} alt='background img' h='190px' objectFit="cover" />
                        <Avatar name="user avatar" src={user.profileImg} mt='-68px' size="2xl" border='solid 5px white'></Avatar>
                        <FormControl id='name' isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder='Name' type="text" name="name" />
                        </FormControl>
                        
                        <FormControl id='bio' isRequired>
                            <FormLabel>Bio</FormLabel>
                            <Input placeholder='Email' type="email" name="bio"/>
                        </FormControl>

                        <FormControl id='location' isRequired>
                            <FormLabel>Location</FormLabel>
                            <Input placeholder='Location' type="text" name="location" />
                        </FormControl>

                        <FormControl id='birthDate' isRequired>
                            <FormLabel>Date of Birth</FormLabel>
                            <Input placeholder='Username' type="text" name="birthDate" />
                        </FormControl>

                    </Stack>
                
            </ModalBody>
    
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue"  >
                Save
              </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
};

function Bio() {
    const { user } = useContext(AuthContext)
    const history = useHistory()
    const [numberFollowing, setNumberFollowing] = useState([])
    const [numberFollower, setNumberFollower] = useState([])

    const [following, setFollowing] = useState([])
    const [follower, setFollower] = useState([])

    const getFollow = async () => {
        try {
            const resNumberFollowing = await axios.get('/follows/number-of-following')
            const resNumberFollower = await axios.get('/follows/number-of-follower')
            const resFollowing = await axios.get('/follows/following')
            const resFollower = await axios.get('/follows/follow-by')

            setNumberFollowing(resNumberFollowing.data.following)
            setNumberFollower(resNumberFollower.data.follower)
            setFollowing(resFollowing.data.following)
            setFollower(resFollower.data.followBy)
        } catch (err) {

        }
    };

    console.log(following)
    console.log(follower)

    useEffect(() => {
        getFollow()
    }, [])

        
    const handleFollowButton = () => {
        history.push('/follow')
    }

    const createdAtDate = new Date(user.createdAt)
    const userBirthDate = new Date(user.birthDate)
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

    return (

        <Flex direction='column' w='600px' h='460px'>
            <Image src={user.backgroundImg} alt='background img' h='190px' objectFit="cover" />
            <Flex dir='row' justify='space-between' mx='15px' h='60px'>
                <Avatar name="user avatar" src={user.profileImg} mt='-68px' size="2xl" border='solid 5px white'></Avatar>
                <EditProfileModal
                    user={user}
                 />
                {/* <Button mt='15px' bgColor='white' border='solid 1px' borderRadius='full' color='blue.400' >Edit profile</Button> */}
            </Flex>

            <Flex dir='column' textAlign='left' ml='20px' >
                <Stack spacing={3}>
                    <Box>
                        <Text fontWeight='700' fontSize='25px'>{user.name}</Text>
                        <Text color='gray.400' mt='-5px'>@{user.username}</Text>
                    </Box>
                    <Text h='50px'>{user.bio}</Text>
                    <Text color='gray.500'>Born {`${months[userBirthDate.getMonth()]} ${userBirthDate.getDate()}, ${userBirthDate.getFullYear()}`} <CalendarIcon ml='5px' mb='1px' /> Joined {`${months[createdAtDate.getMonth()]} ${createdAtDate.getFullYear()}`} </Text>
                    {/* {Date(user.createdAt).split(' ').slice(1, 4).join(' ')} */}
                </Stack>
            </Flex>
            

            <Flex dir='row' ml='20px' mt='10px'>
                <HStack spacing={5}>
                    <Button variant='ghost' onClick={handleFollowButton} _hover={{ textDecoration:'underline' }}>
                        <HStack spacing={1}>
                            <Text fontWeight='700'>{numberFollowing.count}</Text>
                            <Text color='gray.400'>Following</Text>
                        </HStack>
                    </Button>
                    <Button variant='ghost'  onClick={handleFollowButton} _hover={{ textDecoration:'underline' }}>
                        <HStack spacing={1}>
                            <Text fontWeight='700'>{numberFollower.count}</Text>
                            <Text color='gray.400'>Follower</Text>
                        </HStack>
                    </Button>
                </HStack>
            </Flex>

            
        </Flex>
    )
}

export default Bio