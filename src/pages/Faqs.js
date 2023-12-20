import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2';
import NavHeader from '../components/NavHeader';
import { btnCurvedStyle } from '../services/api';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function Faqs() {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const [faqData, setFaqData] = useState([
    {
      question : 'What is Country Chicken Co, and what products do you offer ?',
      answer : 'Country Chicken Co is a brand that specializes in providing authentic poultry selections, including naturally grown, free-range, and village-raised birds. Additionally, we offer pickles, eggs, and marinades.'
    },
    {
      question : 'What types of country chicken do you offer?',
      answer : '<p>We offer six distinct types of country chicken:</p><p>1.Warrior Country Chicken 2.Kadaknath Country Chicken 3.Nutri Soft Country Chicken 4.Young Warrior Country Chicken 5.Tender Country Chicken 6.Queen of Country Chicken 7.Classic Country Chicken</p>'
    },
    {
      question : 'What is the difference between free-range, village, and Nutri Soft chicken?',
      answer : 'Free-range birds are grown on vast, open farms to ensure a natural environment for the chickens. Village birds are raised in traditional backyards and villages, providing an authentic "natu kodi" experience. Nutri Soft Chicken is a healthier and softer variant of chicken, naturally grown on free-range farms, which can be consumed in our day-to-day diet.'
    },
    {
      question : 'How do you ensure the authenticity and quality of your products?',
      answer : 'We take pride in being the authenticity you can trust. We collaborate with over 15,000 Poultry farmers across India to source the most authentic and premium quality country chicken. Our commitment to quality ensures that you receive the best Naturally raised chickens from us.'
    },
    {
      question : 'What sets Country Chicken Co products apart from others?',
      answer : 'Our products stand out due to their authenticity, quality, and diverse range of chicken breeds. We offer options like free-range, village-raised, and Nutri Soft Chicken, providing a unique culinary experience. Our strong partnerships with farmers and commitment to natural growth practices further distinguish us.'
    },
    {
      question : 'Can you provide more information about Nutri Soft Chicken?',
      answer : 'Nutri Soft Chicken is a special variant known for its softness, juiciness, and health benefits. It is grown in free-range farms, allowing the chickens to develop in a natural environment. This results in a healthier and tastier alternative to regular chicken'
    },
    {
      question : 'How can I stay updated on Country Chicken Co latest offerings and promotions?',
      answer : 'To keep up with our latest products and promotions, follow us on social media platforms like Instagram, Facebook, and Twitter at @Countrychickenco and regularly visit our website. Also, for a more streamlined experience, download our app, available on both iOS and Android platforms, ensuring you have all our updates and services at your fingertips. Enjoy the ease and convenience of staying connected with us!'
    },
    {
      question : 'What are Free-range Birds?',
      answer : 'Free-range birds are a type of country chicken raised on spacious, open farms. These chickens are allowed to roam freely and grow naturally, resulting in healthier and more flavorful meat.'
    },
    {
      question : 'What is the difference between Tender Country Chicken and Village Birds?',
      answer : 'Tender Country Chicken refers to a specific variety of country chicken known for being the softest form of country chicken. Village Birds, on the other hand, are raised in the backyards of homes in villages. Each home typically raises 10-15 birds, giving you an authentic taste and experience.'
    },
    {
      question : 'What are Village Birds?',
      answer : 'Village Birds are a type of country chicken raised in the backyards of farmers and rural villages. This upbringing provides an authentic "natu kodi" experience, resulting in distinctive flavors and textures. We offer four varieties of Village Birds: Warrior Country Chicken, Kadaknath Country Chicken, Young Warrior Country Chicken, and Nutri Soft Chicken.'
    },
    {
      question : 'Tell me about Nutri Soft Chicken.',
      answer : 'Nutri Soft Chicken is a unique variant that is softer, juicier, and also offers a healthier alternative to regular chicken. It is raised in free-range farms, making it more nutritious and healthier than regular chicken.'
    },
    {
      question : 'Where can I find your stores?',
      answer : '<p>We currently have seven stores located in Hyderabad: 1.Pragathinagar 2.Manikonda 3.KPHB 4.Kothapet 5.Attapur 6.Sainikpuri 8.Chandanagar  For more details about our store locations, please visit the &quot;Stores&quot; section on our website.</p>'
    },
    {
      question : 'Are your chickens hormone-free and antibiotic-free?',
      answer : 'Yes, our chickens are raised without the use of hormones or antibiotics. We believe in providing our customers with poultry that is  natural and healthy as best possible.'
    },
    {
      question : 'Are there any cooking tips for your chicken varieties?',
      answer : 'Certainly! We provide cooking tips and recommendations for each chicken variety on our website. These tips will help you make the most out of the unique flavors and textures of each type of chicken.'
    },
    {
      question : 'Is your packaging environmentally friendly?',
      answer : 'Yes, we are committed to sustainability. We strive to use eco-friendly packaging materials  to minimize our environmental impact.'
    }
  ])

  return (
    <Box sx={{padding:'4vw', marginTop:'7vh', paddingBottom:'8vh'}}>

    <NavHeader />
    <Box sx={{color:'#a4243d', fontSize:'40px', ml:2,mb:1, fontFamily:'Foregen'}}>
      FAQs
    </Box>

    <Box sx={{padding:'10px'}}>

      {
        faqData.map((faq, index) => {
          return <Accordion expanded={expanded === index} onChange={handleChange(index)} sx={{marginTop:'10px'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Box sx={{padding:'10px'}}>
            {faq.question}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ color: 'text.secondary', padding:'10px' }} dangerouslySetInnerHTML={{__html: faq.answer}}>
            </Box>
          </AccordionDetails>
        </Accordion>
        })
      }
    

    </Box>


  </Box>
  )
}

export default Faqs