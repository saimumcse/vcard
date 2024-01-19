package testCases;

import org.testng.annotations.Test;
import base.DriverSetup;
import pageObject.InfoPage;

public class TC017_InfoPage extends DriverSetup {

	@Test

	public void Info() {
		InfoPage obj = new InfoPage(driver);

		obj.createBtn();
		obj.firstName("MD Saimum Islam");
		obj.companyName("Creative IT Soft");
		obj.submitBtn();

	}

}
