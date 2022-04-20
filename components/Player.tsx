import {
  RangeSlider,
  Box,
  Flex,
  ButtonGroup,
  IconButton,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useState, useRef, useEffect } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlineRepeat,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
} from "react-icons/md";
import { formatSongTime } from "../lib/formatter";

const Player = ({ songs, activeSong }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isShuffleON, setShuffle] = useState(false);
  const [isRepeatON, setRepeat] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seek, setSeek] = useState(0.0);
  const [duration, setDuration] = useState(0.0);
  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong.id)
  );
  const toggleIsPlaying = () => setIsPlaying(!isPlaying);
  const toggleShuffle = () => setShuffle(!isShuffleON);
  const toggleRepeat = () => setRepeat(!isRepeatON);

  const songRef = useRef(null);
  useEffect(() => {
    let timerAnimationId;
    if (isPlaying && !isSeeking) {
      const f = () => {
        setSeek(songRef.current.seek());
        timerAnimationId = requestAnimationFrame(f);
      };
      timerAnimationId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerAnimationId);
    }
    cancelAnimationFrame(timerAnimationId);
  }, [isSeeking, isPlaying]);

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSong = () => {
    setIndex((state) => {
      if (isShuffleON) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) {
          return nextSong();
        }
        return next;
      }

      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (isRepeatON) {
      setSeek(0);
      songRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = songRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    songRef.current.seek(e[0]);
  };

  return (
    <Box>
      <Center>
        <ButtonGroup color="gray.600">
          <IconButton
            fontSize="l6px"
            color={isShuffleON ? "white" : "gray.600"}
            variant="link"
            aria-label="shuffle"
            outline="none"
            onClick={toggleShuffle}
            icon={<MdShuffle />}
          />
          <IconButton
            fontSize="24px"
            variant="link"
            aria-label="Previous"
            outline="none"
            color="white"
            onClick={prevSong}
            icon={<MdSkipPrevious />}
          />
          {!isPlaying ? (
            <IconButton
              fontSize="4xl"
              variant="link"
              aria-label="Play"
              outline="none"
              color="white"
              onClick={toggleIsPlaying}
              icon={<MdOutlinePlayCircleFilled />}
            />
          ) : (
            <IconButton
              fontSize="4xl"
              variant="link"
              aria-label="pause"
              color="white"
              outline="none"
              onClick={toggleIsPlaying}
              icon={<MdOutlinePauseCircleFilled />}
            />
          )}

          <IconButton
            fontSize="24px"
            variant="link"
            aria-label="next"
            outline="none"
            color="white"
            onClick={nextSong}
            icon={<MdSkipNext />}
          />
          <IconButton
            fontSize="16px"
            variant="link"
            aria-label="repeat"
            outline="none"
            onClick={toggleRepeat}
            color={isRepeatON ? "white" : "gray.600"}
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>
      <Box>
        <ReactHowler
          ref={songRef}
          src={activeSong?.url}
          playing={isPlaying}
          onLoad={onLoad}
          onEnd={onEnd}
        />
        <Flex>
          <Text fontSize="sm" color="gray.600" flexBasis="7%">
            {formatSongTime(seek)}
          </Text>
          <RangeSlider
            // eslint-disable-next-line jsx-a11y/aria-proptypes
            aria-label={["min", "max"]}
            flexBasis="86%"
            min={0}
            step={0.1}
            max={duration ? +duration.toFixed(2) : 0}
            onChange={onSeek}
            value={[seek]}
            onChangeStart={() => {
              setIsPlaying(false);
              setIsSeeking(true);
            }}
            onChangeEnd={() => {
              setIsPlaying(true);
              setIsSeeking(false);
            }}
          >
            <RangeSliderTrack bg="gray.800">
              <RangeSliderFilledTrack bg="gray.400" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
          </RangeSlider>
          <Text fontSize="sm" color="gray.600" flexBasis="7%" textAlign="right">
            {formatSongTime(duration)}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
