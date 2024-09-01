'use client'
import {
  Avatar,
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import { useAuth } from '../context/useAuth'

const Navbar = () => {
  const { onOpen, isOpen, onClose } = useDisclosure()

  const { user, signInWithGoogle, logout } = useAuth()

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
      console.log('success')
    } catch (error) {
      console.log('errr', error)
    }
  }
  return (
    <Box
      py="4"
      position={'sticky'}
      top={0}
      width={'100%'}
      zIndex={20}
      bg={'black'}
    >
      <Container maxW={'container.xl'}>
        <Flex justifyContent={'space-between'}>
          <Link href="/">
            <Box
              fontSize={'2xl'}
              fontWeight={'bold'}
              color={'red'}
              letterSpacing={'widest'}
              fontFamily={'mono'}
            >
              POPFLIX
            </Box>
          </Link>

          {/* DESKTOP */}
          <Flex
            gap="4"
            alignItems={'center'}
            display={{ base: 'none', md: 'flex' }}
            fontWeight={'medium'}
          >
            <Link href="/">Home</Link>
            <Link href="/movies">Movies</Link>
            <Link href="/shows">Shows</Link>
            <Link href="/search">
              <SearchIcon fontSize={'xl'} />
            </Link>
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={'red.500'}
                    color={'white'}
                    size={'sm'}
                    name={user?.displayName || user?.email}
                  />
                </MenuButton>
                <MenuList>
                  <Link href="/profile">
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <Link href="/watchlist">
                    <MenuItem>Watchlist</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
            {!user && (
              <Avatar
                size={'sm'}
                bg={'gray.800'}
                as="button"
                onClick={handleGoogleLogin}
              />
            )}
          </Flex>

          {/* Mobile */}
          <Flex
            display={{ base: 'flex', md: 'none' }}
            alignItems={'center'}
            gap="4"
          >
            <Link href="/search">
              <SearchIcon fontSize={'xl'} />
            </Link>
            <IconButton
              onClick={onOpen}
              icon={<HamburgerIcon />}
              aria-label="Menu Toggle"
            />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg={'black'}>
                <DrawerCloseButton />
                <DrawerHeader>
                  {user ? (
                    <Flex alignItems="center" gap="2">
                      <Avatar
                        bg="red.500"
                        size={'sm'}
                        name={user?.displayName || user?.email}
                      />
                      <Box fontSize={'sm'}>
                        {user?.displayName || user?.email}
                      </Box>
                    </Flex>
                  ) : (
                    <Avatar
                      size={'sm'}
                      bg="gray.800"
                      as="button"
                      onClick={handleGoogleLogin}
                    />
                  )}
                </DrawerHeader>
                <DrawerBody>
                  <Flex flexDirection={'column'} gap={'4'} onClick={onClose}>
                    <Link href="/profile">Profile</Link>
                    <Link href="/watchlist">Watchlist</Link>
                    <Link href="/">Home</Link>
                    <Link href="/movies">Movies</Link>
                    <Link href="/shows">Shows</Link>
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar
