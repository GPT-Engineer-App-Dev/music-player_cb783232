// Complete the Index page component here
import { Box, VStack, HStack, Image, Text, IconButton, Slider, SliderTrack, SliderFilledTrack, SliderThumb, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, Button, Center } from "@chakra-ui/react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaList } from "react-icons/fa";
import { useState, useRef } from "react";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Image borderRadius="md" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyfGVufDB8fHx8MTcwOTgwNTA1Mnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Album Cover" boxSize="250px" />
        <Text fontWeight="bold" fontSize="xl">
          Track Title
        </Text>
        <Text fontSize="md" color="gray.500">
          Artist Name
        </Text>
        <audio ref={audioRef}>
          {/* Here you should place your actual music file URL */}
          <source src="path_to_music_file.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <HStack spacing={4}>
          <IconButton icon={<FaStepBackward />} aria-label="Previous track" isRound />
          <IconButton icon={isPlaying ? <FaPause /> : <FaPlay />} aria-label={isPlaying ? "Pause" : "Play"} isRound onClick={handlePlayPause} />
          <IconButton icon={<FaStepForward />} aria-label="Next track" isRound />
        </HStack>
        <Slider aria-label="Volume" value={volume} onChange={handleVolumeChange}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="blue.500" as={FaVolumeUp} />
          </SliderThumb>
        </Slider>
        <IconButton icon={<FaList />} aria-label="Playlist" variant="outline" onClick={onOpen} />
      </VStack>

      {/* Playlist Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Playlist</DrawerHeader>
          <DrawerBody>
            {/* Here you would dynamically map over your playlist items */}
            <VStack spacing={4}>
              <Text>No tracks in playlist.</Text>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Index;
