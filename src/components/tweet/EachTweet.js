import { Flex, Image, Text, HStack, Button, IconButton, Menu, MenuButton, MenuList, MenuItem, Input, Box } from '@chakra-ui/react'
import { RepeatIcon, ExternalLinkIcon, ChatIcon, StarIcon, SettingsIcon, DeleteIcon, DownloadIcon, EditIcon, AttachmentIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { useEffect, useState, useContext } from 'react'
import axios from '../../config/axios'
import { AuthContext } from '../../contexts/AuthContextProvider'
import { useHistory } from 'react-router-dom'


const ModalAddReply = ({ replyContent, setReplyContent, user, handleReplyTweet }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
        <IconButton onClick={onOpen} _hover={{ background: "blue.100", color: "blue.300", }} variant="ghost" as={ChatIcon} w='17px' h='17px' color="gray.400" borderRadius='full'  />
        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader paddingBottom='0'>
                <Box w='109%' h='30px' borderBottom='1px' borderColor='gray.200' ml='-24px'></Box>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex direction='row'>
                    <Image src={user.profileImg} alt='imgUser' h='50px' w='50px' borderRadius='full' mr='5px'/>
                    <Input placeholder='Tweet your reply' borderStyle='none' _focus={{ borderStyle:'none' }} value={replyContent} onChange={(e) => setReplyContent(e.target.value)}></Input>
                </Flex>
            </ModalBody>
    
            <ModalFooter>
                <Flex direction='row' w='100%' ml='60px' paddingTop='10px' borderTop='1px' borderColor='gray.200'>
                    <HStack spacing="10px" justify='space-between' w='100%'>
                        <IconButton _hover={{ background: "blue.100" }} variant="ghost" as={AttachmentIcon} w='20px' h='20px' color="blue.400" borderRadius='full'/>

                        { replyContent ? <Button onClick={handleReplyTweet} borderRadius='full' bgColor='blue.400' color='white' _hover={{ background: "blue.500", }}>Tweet</Button> : <Button onClick={handleReplyTweet} borderRadius='full' bgColor='blue.400' color='white' _hover={{ background: "blue.500", }} isDisabled>Tweet</Button>}
                    </HStack>
                </Flex>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
};

function EachTweet({id, content,  createdAt,User:{ id: userId, name, username, profileImg }, setTriggerDelete, pathName}) {
    const { user, isBookmark } = useContext(AuthContext)
    const history = useHistory()
    const [replyContent, setReplyContent] = useState('')

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

    const handleGoToTweet = () => {
        history.push('/tweet')
    }

    const handleReplyTweet = () => {
        alert(1)
    }

    const handleLikeTweet = () => {
        alert('like')
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
      ];

    return(
        <Flex direction='row' p='10px 10px 0 10px' w='600px' borderBottom='solid 1px' borderColor='gray.200' >
            <Image src={profileImg} objectFit='cover' alt='imgUser' boxSize="50px" borderRadius='full'/>
            
            <Flex direction='column'>
                <Flex direction='row' alignItems='flex-start' ml='10px' justify ='space-between' w='520px' >
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
                        {pathName==='Bookmark' &&
                            <MenuItem icon={<DeleteIcon />} onClick={() => handleDeleteTweet(id)}>
                                Delete Tweet from Bookmark
                            </MenuItem>
                        }   
                        </MenuList>
                    </Menu>
                </Flex>

                <Text textAlign='left' ml='10px' mt='5px' onClick={handleGoToTweet} >{content}</Text>

                <Flex direction='row' m='14px 0 20px'>
                    <HStack spacing="100px" >
                        {/* <IconButton _hover={{ background: "blue.100", color: "blue.300", }} variant="ghost" as={ChatIcon} w='17px' h='17px' color="gray.400" borderRadius='full'/> */}
                        <ModalAddReply
                            replyContent={replyContent}
                            setReplyContent={setReplyContent}
                            user={user}
                            handleReplyTweet={handleReplyTweet}
                        />
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<RepeatIcon />}
                                variant="ghost"
                                _hover={{ background: "green.100", color: "green.300", }}
                                _focus={{ background: "white", borderStyle:'none' }}
                                w='19px' 
                                h='19px'
                                color='gray.400'
                            />
                            <MenuList>
                                <MenuItem icon={<RepeatIcon />} >
                                    Retweet
                                </MenuItem>
                            
                            </MenuList>
                        </Menu>
                        {/* <IconButton _hover={{ background: "green.100", color: "green.300", }} variant="ghost" as={RepeatIcon} w='18px' h='18px' color="gray.400" /> */}
                        <IconButton 
                            onClick={handleLikeTweet}
                            _hover={{ background: "red.100", color: "red.400", }} 
                            variant="ghost" as={StarIcon} 
                            w='17px' 
                            h='17px' 
                            color="gray.400" 
                        />
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