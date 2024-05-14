package lk.bitproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
@RestController
public class BitprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(BitprojectApplication.class, args);
		System.out.println("Hello worlds");
	}

	@RequestMapping(value = "/")
	public String index(){
		System.out.println("Hello");
		//return "Hello";
		return "<h3 style='color:red'>Hello</h3>";

	}

		@RequestMapping(value = "/testui")
	public ModelAndView testUI(){
		ModelAndView testView = new ModelAndView();

		testView.setViewName("test.html");
		return testView;
	}

	@RequestMapping(value = "/cat")
	public ModelAndView catUI(){
		ModelAndView catView = new ModelAndView();

		catView.setViewName("cat.html");
		return catView;
		
	}

}
