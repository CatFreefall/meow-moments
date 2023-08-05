const sendConfirmationEmail = (username: string) => {
  fetch(`send-confirmation-email/${username}`, {
    method: 'POST',
  })
}

export default sendConfirmationEmail;