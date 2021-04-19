import { Flex, Text, Box, Image, Avatar, Button, IconButton, Stack, HStack, Input, Link, Tabs, TabList, TabPanels, Tab, TabPanel, Icon, FormControl, FormLabel, } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { useContext, useEffect, useState } from 'react';
import { CalendarIcon, PlusSquareIcon, DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { AuthContext } from '../../contexts/AuthContextProvider';
import axios from '../../config/axios'
import { useHistory } from 'react-router-dom'
import { IconBase } from 'react-icons/lib';

const EditProfileModal = ({ user, updateUser, setUpdateUser, handleUpdateChange, handleEditProfileButton }) => {
    const { isOpen, onOpen, onClose } = useDisclosure({
        onClose: () => {
            setUpdateUser({
                name: '',
                bio: '',
                location: '',
                // birthDate: '',
            });
        }
      });

    return (
        <>
        <Button onClick={onOpen} mt='15px' bgColor='white' border='solid 1px' borderRadius='full' color='blue.400'>
            Edit Profile
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>
                <Text fontWeight='700'>Edit profile</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                    <Flex direction='column' h='190px' w='100%'>
                        <Image src={user.backgroundImg} alt='background img' h='100%'  objectFit="cover" />
                        <Flex direction='row' m='auto'>
                            <IconButton as={PlusSquareIcon} color='white' h='20px' w='20px' mt='-100px' variant='ghost' />
                            <IconButton as={DeleteIcon} color='white'  h='20px' w='20px' mt='-100px' variant='ghost' />
                        </Flex>      
                    </Flex>
                        <Avatar name="user avatar" src={user.profileImg} mt='-68px' size="2xl" border='solid 5px white'></Avatar>
                        <IconButton as={PlusSquareIcon} color='white' h='20px' w='20px' mt='-35px' ml='-85px' variant='ghost'  />
                    <Stack spacing={3}>
                        <FormControl id='name' isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder='Name' type="text" name="name" value={updateUser.name} onChange={handleUpdateChange} />
                        </FormControl>
                        
                        <FormControl id='bio' isRequired>
                            <FormLabel>Bio</FormLabel>
                            <Input placeholder='Bio' type="text" name="bio" value={updateUser.bio} onChange={handleUpdateChange}/>
                        </FormControl>

                        <FormControl id='location' isRequired>
                            <FormLabel>Location</FormLabel>
                            <Input placeholder='Location' type="text" name="location" value={updateUser.location} onChange={handleUpdateChange}/>
                        </FormControl>

                        {/* <FormControl id='birthDate' isRequired>
                            <FormLabel>Date of Birth</FormLabel>
                            <Input placeholder='Date of Birth' type="text" name="birthDate" value={updateUser.birthDate} onChange={handleUpdateChange}/>
                        </FormControl> */}

                    </Stack>
                
            </ModalBody>
    
            <ModalFooter>
              <Button 
                colorScheme="blue" 
                onClick={() => {
                    handleEditProfileButton();
                    onClose();
                }} 
                >
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
    const [updateUser, setUpdateUser] = useState({
        name: '',
        bio: '',
        location: '',
        // birthDate: '',
    })

    const handleUpdateChange = e => {
        const { name, value } = e.target
        setUpdateUser(prev => ({...prev, [name]: value}))
    }

    const handleEditProfileButton = () => {
        axios
        .patch('/users/update-profile', { 
            name: updateUser.name, 
            bio: updateUser.bio,
            location: updateUser.location,
            // birthDate: updateUser.birthDate,
        })
        // .then(res => {

        // })
        .catch(err => {
            console.log(err)
        //   if (err.response) {
        //     setError({ server: err.response.data.message })
        //   } else {
        //     setError({ front: err.message })
        //   }
        })
    }

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
                    updateUser={updateUser}
                    setUpdateUser={setUpdateUser}
                    handleUpdateChange={handleUpdateChange}
                    handleEditProfileButton={handleEditProfileButton}
                 />
                {/* <Button mt='15px' bgColor='white' border='solid 1px' borderRadius='full' color='blue.400' >Edit profile</Button> */}
            </Flex>

            <Flex direction='column' textAlign='left' ml='20px' >
                <Stack spacing={3}>
                    <Box>
                        <Text fontWeight='700' fontSize='25px'>{user.name}</Text>
                        <Text color='gray.400' mt='-5px'>@{user.username}</Text>
                    </Box>
                    <Text h='50px'>{user.bio}</Text>
                    <Text color='gray.500'> <InfoOutlineIcon mb='2px' />  Born {`${months[userBirthDate.getMonth()]} ${userBirthDate.getDate()}, ${userBirthDate.getFullYear()}`} 
                    <CalendarIcon ml='15px' mb='2px' /> Joined {`${months[createdAtDate.getMonth()]} ${createdAtDate.getFullYear()}`} </Text>
                    {/* {Date(user.createdAt).split(' ').slice(1, 4).join(' ')} */}
                </Stack>
            </Flex>
            

            <Flex direction='row' ml='5px' mt='10px'>
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
            </Flex>

            
        </Flex>
    )
}

export default Bio