import AccountForm from "@/components/profile/account/account-form";
import { getSessionUser } from "@/data/user";

const AccountPage = async () => {
  const user = await getSessionUser();

  return <AccountForm user={user} />;
};

export default AccountPage;
