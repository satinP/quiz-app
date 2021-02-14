import React from "react";
import { Wrapper } from "./SelectStyles";

type SelectProps = {
  name: string;
  label: string;
  options: any;
  callback: any;
  value?: any;
};

function Select(props: SelectProps) {
  return (
    <Wrapper>
      <label htmlFor={props.name}>{props.label}</label>
      <select onClick={props.callback}>
        <option value="" disabled hidden>
          Selecione
        </option>

        {props.options.map((option: any) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </Wrapper>
  );
}

export default Select;
