const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser(
        { auth0Id: user.sub, email: user.email },
        {
          onSuccess: () => navigate("/"),
          onError: () => navigate("/"), // ← navigate even if it fails
        }
      );
      hasCreatedUser.current = true;
    }
  }, [createUser, navigate, user]);

  return <>Loading...</>;
};