package testCases;

import org.testng.annotations.Test;
import base.DriverSetup;
import pageObject.InfoPage;

public class TC019_InfoPage extends DriverSetup {

	@Test

	public void Info() {
		InfoPage obj = new InfoPage(driver);

		obj.createBtn();
		obj.qrName("My QR Code");
		obj.selectDesign();
		obj.firstName("MD Saimum Islam");
		obj.lastName("Ripon");
		obj.phoneNumber("01738002113");
		obj.altPhone("01521302783");
		obj.email("saimumisalm2@gmail.com");
		obj.personalWeb("www.saimum.com");
		obj.profession("SQA Engineer");
		obj.summary("CIS TECH LTD. (Chain of Inovative Solutions & Technology Limited) is a provider of custom Software development services based on Software as a service(SaaS) and Software as a product(SaaP). CIS journey was Started from 2012, and it was incorporated in Jan 2022. ");
		obj.scrollDown(driver, 1200);
		obj.searchBox(driver, "Bangladesh");
		obj.submitBtn();

	}

}
