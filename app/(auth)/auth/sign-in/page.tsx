import SignInFormClient from "@/modules/auth/components/sign-in-form-client";
import Image from "next/image";
import React from "react";

const SignInPage = () => {
	return (
		<>
			<Image
				src={"/login.svg"}
				alt="login-image"
				height={300}
				width={300}
				className="m-6 object-cover"
			/>
			<SignInFormClient />
		</>
	);
};

export default SignInPage;
