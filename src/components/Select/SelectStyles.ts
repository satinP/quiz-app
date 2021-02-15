import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: 5px;

  select {
    border-radius: 0.8rem;
    text-align-last: center;
    outline: 0;
  }

  :focus-within
  ::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: transparent;
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  }
`