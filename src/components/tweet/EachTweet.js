import { Flex, Image, Text, HStack, Button, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { RepeatIcon, ExternalLinkIcon, ChatIcon, StarIcon, SettingsIcon, DeleteIcon, DownloadIcon, EditIcon } from '@chakra-ui/icons'
import { useEffect, useState, useContext } from 'react'
import axios from '../../config/axios'
import { AuthContext } from '../../contexts/AuthContextProvider'
//
function EachTweet({id, content,  createdAt,User:{ id: userId, name, username, profileImg }, setTriggerDelete}) {
    const { user, isBookmark } = useContext(AuthContext)

    const handleDeleteTweet = async (tweetId) => {
        try {
            //await axios.delete(`/tweets/bookmarks/${tweetId}`)
            await axios.delete(`/tweets/${tweetId}`)
            setTriggerDelete(prev => !prev)
        } catch (err) {

        }
    }

    const handleBookmarkButton = async (tweetId) => {
        try {
           const bookmark = await axios.post(`/tweets/bookmark/`, {content, userId: user.id, tweetId})
           if(bookmark) isBookmark(true)
           
        } catch (err) {

        }
    }

    const createdAtDate = new Date(createdAt)
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
        // "January",
        // "February",
        // "March",
        // "April",
        // "May",
        // "June",
        // "July",
        // "August",
        // "September",
        // "October",
        // "November",
        // "December"
      ];

    return(
        <Flex direction='row' p='10px 10px 0 10px' w='600px' borderBottom='solid 1px' borderColor='gray.200'>
            <Image src={profileImg} alt='imgUser' h='50px' w='50px' borderRadius='full' mr='5px'/>
            <Flex direction='column'>
                <Flex direction='row' alignItems='flex-start' ml='10px' justify ='space-between' w='520px'>
                    <HStack spacing="10px">
                        <Text>{name}</Text>
                        <Text color='gray.400'>@{username}</Text>
                        <Text color='gray.400'>{`${months[createdAtDate.getMonth()]} ${createdAtDate.getDate()}, ${createdAtDate.getFullYear()}`}</Text>
                        {/* <Text color='gray.400'>{Date(createdAt).split(' ').slice(1, 4).join(' ')}</Text> */}
                    </HStack>

                    {/* <IconButton icon={<SettingsIcon/>} variant="ghost" _hover={{ background: "white" }} _focus={{ background: "white", borderStyle:'none' }} /> */}
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<SettingsIcon />}
                            variant="ghost"
                            _hover={{ background: "white" }}
                            _focus={{ background: "white", borderStyle:'none' }}
                            h='25px' 
                            w='30px'
                            color='gray.400'
                        />
                        <MenuList>
                        {user.id === userId && 
                            <MenuItem icon={<DeleteIcon />} onClick={() => handleDeleteTweet(id)}>
                                Delete Tweet
                            </MenuItem>
                        }
                           
                        </MenuList>
                    </Menu>
                </Flex>

                <Text textAlign='left' ml='10px' mt='5px'>{content}</Text>

                <Flex direction='row' m='14px 0 20px'>
                    <HStack spacing="100px" >
                        <IconButton _hover={{ background: "blue.100", color: "blue.300", }} variant="ghost" as={ChatIcon} w='18px' h='18px' color="gray.400" borderRadius='full'/>
                        <IconButton _hover={{ background: "green.100", color: "green.300", }} variant="ghost" as={RepeatIcon} w='18px' h='18px' color="gray.400" />
                        <IconButton _hover={{ background: "red.100", color: "red.400", }} variant="ghost" as={StarIcon} w='18px' h='18px' color="gray.400" />
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<DownloadIcon />}
                                variant="ghost"
                                _hover={{ background: "white" }}
                                _focus={{ background: "white", borderStyle:'none' }}
                                w='19px' 
                                h='19px'
                                color='gray.400'
                            />
                            <MenuList>
                            {user.id === userId && 
                                <MenuItem icon={<EditIcon />} onClick={() => handleBookmarkButton(id)}>
                                    Add Tweet to Bookmarks
                                </MenuItem>
                            }
                            
                            </MenuList>
                        </Menu>
                        {/* <IconButton _hover={{ background: "blue.100", color: "blue.300", }} variant="ghost" as={ExternalLinkIcon} w='18px' h='18px' color="gray.400" onClick={() => handleBookmarkButton(id)}/> */}
                    </HStack>
                </Flex>
            </Flex>

        </Flex>
    )   
}

export default EachTweet