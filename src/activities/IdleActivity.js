function IdleActivity(entity) {
  return {
    tick: (entity, deltaTime) => {
      // Idle activity simply does nothing
      return false; // Return false to keep it running
    }
  };
}

export { IdleActivity }