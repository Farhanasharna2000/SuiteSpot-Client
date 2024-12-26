import img1 from '../assets/images/breadcumb.jpg'
import img2 from '../assets/images/about.jpg'




const About = () => {
    return (
        <div >
          <section style={{ backgroundImage: `url(${img1})` }} className=" bg-no-repeat bg-cover  h-[550px] bg-center grid items-center justify-center">
    <div className="mt-10 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl leading-10 lg:leading-[60px] 2xl:leading-[70px] text-white font-semibold  uppercase">About Us</h1>
        <div className="flex items-center justify-center">
            <a className="text-base lg:text-2xl leading-10 2xl:leading-[70px] text-white font-semibold  flex items-center" href="/">Home <span className="mx-2 text-white">/</span></a>
            <a className="text-base lg:text-2xl leading-10 2xl:leading-[70px] text-white font-semibold  capitalize" href="#">About Us</a>
        </div>
    </div>
</section>
<section className='container mx-auto'>
    <div className="mx-10 py-20  sm:overflow-hidden lg:overflow-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 aos-init aos-animate" data-aos="zoom-in-up" data-aos-duration="1000"><img src={img2} alt="" className="w-full h-full"/></div>
            <div className="mt-10 md:mt-0 md:ml-10 lg:ml-[90px] 2xl:ml-[100px]  space-y-3 xl:space-y-4 flex-1 aos-init aos-animate" data-aos="zoom-in-down" data-aos-duration="1000">
                <h5 className="text-base text-[#0b6f54] leading-[26px] font-medium">LUXURY HOTEL AND RESORT</h5>
                <h1 className="text-[22px] sm:text-2xl md:text-[21px]  xl:text-3xl 2xl:text-[38px] leading-6 md:leading-7 lg:leading-[30px] 2xl:leading-[44px] text-[#0b6f54]  dark:text-white font-extrabold my-4">LUXURY BEST HOTEL IN CITY <br /> NEWYORK, USA</h1>
                <p className="text-sm xl:text-base md:text-sm lg:text-base font-Lora text-gray dark:text-lightGray font-normal leading-[26px]">Rapidiously myocardinate cross-platform intellectual capital after marketing model. Appropriately create interactive infrastructures after maintainable are Holisticly facilitate stand-alone inframe Compellingly create premier open data
                    through economically.</p>
                <p className="text-sm sm:text-base font-Lora text-gray dark:text-lightGray font-normal leading-[26px] mt-5">Rapidiously myocardinate cross-platform intellectual capital after marketing model. Appropriately create interactive infrastructures after</p>
              
            </div>
        </div>
    </div>
</section>  

        </div>
    );
};

export default About;