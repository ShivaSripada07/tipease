import Business from "./Business";
import Partners from "./Partners";
import UserNavbar from "./UserNavbar";
import CashlessTippingProcess from "./CashlessTippingProcess";
import LoginFooter from "./LoginFooter";
function HowWork()
{
    return(
        <>
            <UserNavbar/>
            <CashlessTippingProcess/>
            <Partners/>
            <Business/>
            <LoginFooter/>
        </>
    );
}
export default HowWork;