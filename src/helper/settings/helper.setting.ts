

export const handleFeedbackClick = () => {
  const email = "sevenventurelabs@gmail.com";
  const subject = encodeURIComponent("PromptHub Feedback & Support");
  const body = encodeURIComponent("Hi PromptHub Team,\n\nI would like to share the following feedback:\n");
  
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
};