function IdleActivity() {
  return {
    tick: (entity, deltaTime) => {
      // Idle activity simply does nothing
      console.log("IdleActivity Tick")
      return false; // Return false to keep it running
    }
  };
}

export { IdleActivity }