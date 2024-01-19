package testCases;

import org.testng.annotations.Test;
import base.DriverSetup;
import pageObject.InfoPage;

public class TC018_InfoPage extends DriverSetup {

	@Test

	public void Info() {
		InfoPage obj = new InfoPage(driver);

		obj.createBtn();
		obj.firstName("MD Saimum Islam");
		obj.profession("SQA Engineer");
		obj.submitBtn();

	}

}
