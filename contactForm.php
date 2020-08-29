<?php

	if (isset($_POST['submit']) && $_POST['email'] != '')
	{
		if(filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
		{
			$name = $_POST['name'];
		  $emailFrom = $_POST['email'];
		  $message = $_POST['message'];
		  $subject = "A Message from Your Website";

		  $emailTo = "umeobief@tcd.ie";
		  $headers = "From: ".$emailFrom;
		  $txt = "You have received an email via the EVE website from ".$name.".\n\n".$message;

			mail($emailTo, $subject, $txt, $headers);
			header("Location: index.php?mailsend");

      $subjectReturn = "Your E-mail was Successful";
      $txtReturn = "This Email was used to send an email to me via the website franklinUmeObi.com,
      You are receiving this to confirm your message was received.
      I will respond at my earliest convenience.
      This is an automated E-mail.";
      mail($emailFrom, $subjectReturn, $txtReturn);
		}
}

?>
