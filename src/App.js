import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { array1Data, array2Data } from './dummydata';
import Tile from './Tile';

function turnFileIntiArray(text) {
  let arrayOfLines = [];
  let newLine = '';

  for (var i = 0, n = text.length; i < n; ++i) {
    if (text[i] === '\n' && !!newLine) {
      if (newLine === '\n') newLine = '';
      else {
        arrayOfLines.push(newLine);
        newLine = '';
      }
    } else {
      if (newLine === '\n') newLine = '';
      // else if (newLine === '\t') console.log(newLine);
      else newLine = newLine + text[i];
    }
  }
  return arrayOfLines;
}

function App({ mediaType = 'video' }) {
  const [arrayOfLines1, setArrayOfLines1] = useState(array1Data);
  const [arrayOfLines2, setArrayOfLines2] = useState(array2Data);

  const handleFileChange = (eve) => {
    let file = eve.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      // var textArea = document.getElementById(
      //   eve.target.id === 'textFile1' ? `textArea1` : `textArea2`
      // );
      const textInsideFile = e.target.result;
      // textArea.value = textInsideFile;
      eve.target.id === 'textFile1'
        ? setArrayOfLines1(turnFileIntiArray(textInsideFile))
        : setArrayOfLines2(turnFileIntiArray(textInsideFile));
      console.log(arrayOfLines1, arrayOfLines2);
    };
    reader.readAsText(file);
  };

  return (
    <React.Fragment>
      <MobileScreenContent>
        Right now only available for PC.
      </MobileScreenContent>
      <Container>
        <VideoContainer>
          <input type='file' id='mediaFile' accept='video/*, audio/*' hidden />
          <video
            style={{ display: `${mediaType === 'video' ? 'block' : 'none'}` }}
            controls
          >
            <source src='assets/video.mp4' id='video_here' />
          </video>
          <StyledButton
            htmlFor='mediaFile'
            style={{
              display: `${
                !(mediaType === 'video')
                  ? !(mediaType === 'audio')
                    ? 'block'
                    : 'none'
                  : 'none'
              }`,
            }}
          >
            Add Media
          </StyledButton>
        </VideoContainer>
        <TextWrapper>
          <input
            type='file'
            id='textFile1'
            accept='.txt'
            hidden
            onChange={handleFileChange}
          />
          <StyledButton htmlFor='textFile1'>Add File (.txt)</StyledButton>
          <TileWrapper>
            {arrayOfLines1.map((line, index) => (
              <Tile line={line} key={index} />
            ))}
          </TileWrapper>
          {/* <TextFile id='textArea1' placeholder='Write text here...'></TextFile> */}
        </TextWrapper>
        <TextWrapper>
          <input
            type='file'
            id='textFile2'
            accept='.txt'
            hidden
            onChange={handleFileChange}
          />
          <StyledButton htmlFor='textFile2'>Add File (.txt)</StyledButton>
          <TileWrapper>
            {arrayOfLines2.map((line, index) => (
              <Tile line={line} key={index} />
            ))}
          </TileWrapper>
          {/* <TextFile id='textArea2' placeholder='Write text here...'></TextFile> */}
        </TextWrapper>
        <ControlPanel>
          <FetchVideoWrapper>
            <InputField type='url' placeholder='Ex: http://url.ext/' />
            <StyledButton>Fetch Video</StyledButton>
          </FetchVideoWrapper>
          <ClearWrapper>
            <StyledButton>Clear</StyledButton>
            <StyledButton>Undo</StyledButton>
            <StyledButton>Clear Subtitles</StyledButton>
          </ClearWrapper>
          <ConfigWrapper>
            <WrapperTitle>Configuration Options</WrapperTitle>
            <StyledButton>Transcription</StyledButton>
            <StyledButton>Translation</StyledButton>
          </ConfigWrapper>
          <ExportWrapper>
            <WrapperTitle>Export Translation</WrapperTitle>
            <ButtonsWrapper>
              <StyledButton>Export ASS</StyledButton>
              <StyledButton>Export SRT</StyledButton>
              <StyledButton>Export VTT</StyledButton>
            </ButtonsWrapper>
          </ExportWrapper>
          <ExportWrapper>
            <WrapperTitle>Export Transcript</WrapperTitle>
            <ButtonsWrapper>
              <StyledButton>Export ASS</StyledButton>
              <StyledButton>Export SRT</StyledButton>
              <StyledButton>Export VTT</StyledButton>
            </ButtonsWrapper>
          </ExportWrapper>
          <ConfigWrapper>
            <WrapperTitle>External Links</WrapperTitle>
            <StyledButton>Organization</StyledButton>
            <StyledButton>GibHub Repo</StyledButton>
          </ConfigWrapper>
          <ControlsWrapper>
            <StyledButton>Space: Play/Pause</StyledButton>
            <StyledButton>Ctrl + Z : Undo</StyledButton>
          </ControlsWrapper>
        </ControlPanel>
      </Container>
    </React.Fragment>
  );
}

export default App;

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  padding: 20px;
  gap: 10px;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;
const MobileScreenContent = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  @media screen and (min-width: 901px) {
    display: none;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  & > video {
    width: 100%;
  }
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const TextWrapper = styled.div`
  height: 90vh;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2.5em 2.5em -1.875em rgba(0, 0, 0, 0.5),
    0 1.25em 5em 1em rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

// const TextFile = styled.textarea`
//   height: 90%;
//   width: 90%;
//   cursor: text;
//   color: white;
//   outline: none;
//   font-size: 1.1em;
//   text-align: left;
//   resize: none;
//   padding: 10px;
//   background-color: transparent;
//   border: 1px solid transparent;
//   border-radius: 10px;

//   &:hover {
//     border: 1px solid white;
//   }
// `;

const TileWrapper = styled.div`
  height: 90%;
  width: 90%;
  cursor: text;
  color: white;
  outline: none;
  font-size: 1.1em;
  text-align: left;
  background-color: transparent;
  border: 1px solid transparent;
  overflow-y: scroll;
  overflow-x: hidden;
  gap: 10px;
  display: flex;
  flex-direction: column;
  &:hover {
    border: 1px solid white;
  }
`;

const ControlPanel = styled.div`
  height: 90vh;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  padding: 10px;
  box-shadow: 0 2.5em 2.5em -1.875em rgba(0, 0, 0, 0.5),
    0 1.25em 5em 1em rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const FetchVideoWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
`;

const InputField = styled.textarea`
  width: 100%;
  cursor: text;
  resize: none;
  letter-spacing: 0.1em;
  outline: none;
  padding: 3px;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const StyledButton = styled.label`
  border: 1px solid #fff;
  color: #fff;
  letter-spacing: 0.1em;
  padding: 5px;
  border-radius: 5px;
  transition: 0.2s;
  text-align: center;

  &:hover {
    translate: 0 -2px;
  }
  &:active {
    translate: 0 5px;
  }
`;

const ClearWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const ConfigWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;
const WrapperTitle = styled.label`
  /* grid-area: hd; */
`;

const ExportWrapper = styled.div``;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

const ControlsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  font-size: 0.9em;
`;
