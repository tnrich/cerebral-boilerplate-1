function setValue(input, state) {
  state.set(input.path, input.value);
}

export default setValue;