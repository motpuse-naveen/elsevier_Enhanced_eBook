var quiz = [
    {
        q: `Which of the following conditions causing cough is most prevalent in the immigrant population?`,
        q2: ``,
        q3: [],
        option: [`Chronic bronchitis`, `Asthma`, `Heart failure`, `Pneumonia`, `Tuberculosis`],
        optionStyleType: `st-upper-alpha`,
        answer: [1,4],
        ansText: `Rationale: Only tuberculosis (e) from the listed conditions is more associated with ethnicity.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Which of the following conditions with cough as a major presenting symptom is least likely to produce a productive cough?`,
        q2: ``,
        q3: [],
        option: [`Chronic bronchitis`, `Asthma`, `Bronchiectasis`, `Pneu monia`, `Tuberculosis`],
        optionStyleType: `st-lower-alpha`,
        answer: [1,2],
        ansText: `Rationale: Chronic bronchitis (a), bronchiectasis (c), and tuberculosis (e) are associated with productive coughs; Pneumonia (d) can start with a nonproductive cough but becomes productive; asthma (b) invariably has a nonproductive cough.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Which of the following conditions causing cough is most prevalent in the immigrant population?`,
        q2: ``,
        q3: [],
        option: [`Chronic bronchitis`, `Asthma`, `Heart failure`, `Pneumonia`, `Tuberculosis`],
        optionStyleType: `st-upper-alpha`,
        answer: [4],
        ansText: `Rationale: Only tuberculosis (e) from the listed conditions is more associated with ethnicity.`,
        state: `notAnswered`,
        userAnswered: ``
    },
    {
        q: `Mrs Jones visits your pharmacy complaining of having a dry cough for the last 7 days. After questioning, you decide it is a simple viral infection and recommend simple linctus. If symptoms persist, after how many further days would referral to the physician be appropriate 14 days is`,
        q2: ``,
        q3: [],
        option: [`True` , `False`],
        answer: [0],
        ansText:`Rationale: Conditional referrals are important for safety netting purposes. Acute cough is defined as 3 weeks or less, so in this case giving 14 days as the referral point is correct as the person has had the cough for just 7 days.`, 
        state: 'notAnswered',
        userAnswered: [],
        type:`TF`
    },
    {
        q: `Mrs Jones visits your pharmacy complaining of having a dry cough for the last 7 days. After questioning, you decide it is a simple viral infection and recommend simple linctus. If symptoms persist, after how many further days would referral to the physician be appropriate 10 days is`,
        q2: ``,
        q3: [],
        option: [`True` , `False`],
        answer: [1],
        ansText:`Rationale: Conditional referrals are important for safety netting purposes. Acute cough is defined as 3 weeks or less, so in this case giving 14 days as the referral point is correct as the person has had the cough for just 7 days.`, 
        state: 'notAnswered',
        userAnswered: [],
        type:`TF`
    },
    {
        q: `Dyspnoea is a symptom most closely associated with Heart failure `,
        q2: ``,
        q3: [],
        option: [`True`,`False`],
        answer:[0],
        ansText:`Rationale: Dyspnoea, difficulty in breathing, could be seen in all the listed conditions. However, in a community pharmacy context, people with conditions other than heart failure (c) will be less associated with dyspnoea. Other symptoms such as shortness of breath and fatigue will be more frequently seen.`,
        state: 'notAnswered',
        userAnswered: [],
        type:`TF`
    },
    {
        q: `Mrs Jones visits your pharmacy complaining of having a dry cough for the last 7 days. After questioning, you decide it is a simple viral infection and recommend simple linctus. If symptoms persist, after how many further days would referral to the physician be appropriate?`,
        q2: ``,
        q3: [],
        option: [`3 days`, `5 days`, `7 days`, `10 days`, `14 days`],
        optionStyleType: `st-upper-roman`,
        answer: [4],
        ansText:`Rationale: Conditional referrals are important for safety netting purposes. Acute cough is defined as 3 weeks or less, so in this case giving 14 days as the referral point is correct as the person has had the cough for just 7 days.`, 
        state: `notAnswered`,
        userAnswered: [],
        type:`MCSS`
    },
    {
        q: `Mr Patel, who is 48 years old, presents with a nonproductive cough. Based on epidemiology, what is the most likely cause of the cough?`,
        q2: ``,
        q3: [],
        option: [`Acute bronchitis`, ` Upper airways cough syndrome (postnasal drip)`, `Asthma`, `Viral infection`, `Pneumothorax`],
        optionStyleType: `st-lower-roman`,
        answer: [3],
        ansText:`Rationale: For all patients, regardless of age and gender, viral infection (d) is the most common presentation.`,
        state: `notAnswered`,
        userAnswered: [],
        type:`MCSS`
    },
    {
        q: `Dyspnoea is a symptom most closely associated with which condition?`,
        q2: ``,
        q3: [],
        option: [`Chronic bronchitis`, `Asthma`, `Heart failure`, `Pneumonia`, `Tuberculosis`],
        optionStyleType: `st-decimal`,
        answer:[2],
        ansText:`Rationale: Dyspnoea, difficulty in breathing, could be seen in all the listed conditions. However, in a community pharmacy context, people with conditions other than heart failure (c) will be less associated with dyspnoea. Other symptoms such as shortness of breath and fatigue will be more frequently seen.`,
        state: `notAnswered`,
        userAnswered: [],
        type:`MCSS`
    },
    {
        q: `You are recommending treatment for a young woman to treat a common cold (primary symptom of nasal congestion). She tells you that she is breastfeeding. What would be the most suitable option?`,
        q2: ``,
        q3: [],
        option: [` Vitamin C`, `Steam inhalation`, `Oral sympathomimetics`, `Topical sympathomimetics`, `Antihistamines`],
        answer:[3],
        ansText:`Rationale: Based on evidence, topical sympathomimetics (d) have the strongest evidence of efficacy. The added problem here is can they be given to this patient group? Manufacturer data states no adverse effects recorded and states it to be used with caution.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Simon, who is 32 years old, presents with a nonproductive cough of 6 days’ duration. He has no other symptoms and takes no medication. What would be the most appropriate course of action to take?`,
        q2: ``,
        q3: [],
        option: [`Give pholcodine, 5 mL qds.`, `Advise only on drinking more fluids.`, `Give dextromethorphan, 10 mL qds.`, `Give guafenesin, 10 mL qds.`, `Give glycerine lemon and honey, 10 mL qds.`],
        answer:[1],
        ansText:`Rationale: Guaifenesin (d) is for productive coughs; Pholcodine (a) and dextromethorphan (c) are suitable for nonproductive coughs but current advice is to avoid them where possible; likewise, although chemically inert, glycerine (e) is not advocated.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Steven Blake, who is 37 years old, visits the pharmacy wanting treatment for his cough. After questioning him, you find out he has had a nonproductive cough for the last 7 to 10 days. He also states he has had some nasal congestion and been suffering from occasional shortness of breath. Based on the signs and symptoms listed, what is the most likely diagnosis?`,
        q2: ``,
        q3: [],
        option: [`Upper airways cough syndrome (UACS)`, `Acute bronchitis`, `Chronic bronchitis`, `Pneumonia`, `Pneumothorax`],
        answer:[1],
        ansText:`Rationale: Chronic bronchitis (c) tends not to have nasal congestion; pneumonia (d) after this time should present with productive cough; pneumothorax (e) is very sudden in onset and will not have this history. This leaves UACS (a) and acute bronchitis (b) as viable options. In this case, acute bronchitis is more likely to have shortness of breath as a symptom.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Jane Thompson, a 19-year-old woman, has a nonproductive cough. You believe it to be a viral infection. Jane is asthmatic and suffers from type 1 diabetes. What would be the most appropriate treatment or course of action?`,
        q2: ``,
        q3: [],
        option: [`No treatment`, `A demulcent`, `A cough suppressant`, `An antihistamine`, `An expectorant`],
        answer: [0],
        ansText:`Rationale: Viral infections are self-limiting, and no treatment is necessary, so (a) would be a suitable recommendation. A demulcent could be tried. Because they are diabetic, a sugar-free alternative would be useful, but it is unlikely that a few days’ treatment with a demulcent containing sugar will affect their diabetic control. If a demulcent containing sugar is recommended, the person could be told to monitor their blood sugar level more regularly. Cough suppressants and antihistamines have no evidence of efficacy and should not be recommended. An expectorant is only suitable for productive coughs.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Joanne Martin presents with a productive cough. She tells you that is yellow-green in colour. Given this information, what condition is most likely?`,
        q2: ``,
        q3: [],
        option: [`Acute viral infection`, `Heart failure`, `Pneumonia`, `Chronic bronchitis`, `Acute bacterial infection`],
        answer: [0],
        ansText:`Rationale: Sputum colour can be useful in helping narrow down the differential diagnosis. Viral and bacterial infection can range from sputum with no colour to yellow, green or brown. Given that viral infection is much more prevalent than bacterial infection, this is the most likely condition in this scenario.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `David Daly, a 52-year-old man, presents with symptoms of nasal congestion, slight sore throat, headache, and loss of smell. The pharmacist decides to make a referral to the physician because the differential diagnosis suggests the following:`,
        q2: ``,
        q3: [],
        option: [`Influenza`, `Sinusitis`, `Postnasal drip`, `Rhinitis`, `Glandular fever`],
        answer:[1],
        ansText:`Rationale: Nasal congestion and sore throat are hallmark symptoms of the common cold. However, loss of smell in association with these symptoms can suggest sinusitis.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `A middle-aged man presents with sore throat. He has had the symptoms for 3 days. From the list of other symptoms, which would warrant referral to the physician?`,
        q2: ``,
        q3: [],
        option: [`Rhinorrhoea, cough, malaise, fever, headache and hoarseness`, `Rhinorrhoea, malaise, fever, headache and hoarseness`, `Rhinorrhoea, cough, malaise, headache and hoarseness`, `Rhinorrhoea, cough, malaise and fever`, `Rhinorrhoea, cough, malaise, fever and hoarseness`],
        answer:[1],
        ansText:`Rationale: The symptom cluster of rhinorrhoea, cough, malaise, fever, headache and hoarseness are suggestive of viral infection. Absence of cough can indicate a bacterial infection and is therefore worthy of referral.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `A 28-year-old patient presents with a cold and tells you the following: ‘I developed a sore throat a few days ago and now, as you can hear, my voice is very hoarse. My nose is all bunged up and I have a headache. I have taken paracetamol, which has not helped that much’. Which of the following is the most appropriate advice to give?`,
        q2: ``,
        q3: [],
        option: [`See a GP; the paracetamol should have helped ease the symptoms.`, `See a GP; it sounds like you may now have sinusitis.`, `See a GP; the symptoms sound more like a bacterial infection than a viral infection.`, `It sounds like a typical cold; try some vitamin C and keep taking the paracetamol.`, `It sounds like a typical cold; keep taking the paracetamol and try pseudoephedrine to ease the nasal congestion.`],
        answer: [4],
        ansText:`Rationale: Options a, b, and c all suggest referral but the symptom cluster does sound like normal symptoms of a cold and could be treated. This leaves d and e as possible correct answers. Vitamin C (d) has no evidence of efficacy, so e is the most suitable answer.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `From the list below, what symptom(s) would best describe a bacterial sore throat?`,
        q2: ``,
        q3: [],
        option: [`Tonsillar exudate, cough, headache`,`Substantial tonsillar exudate, swollen cervical glands and high-grade fever`,`Tonsillar exudate, swollen cervical glands, cough and headache`,`Substantial tonsillar exudate, and swollen cervical glands`, `Tonsillar exudate, swollen cervical glands and high-grade feverAcute viral infection`],
        answer:[1],
        ansText:`Rationale: A bacterial cause is hard to establish but a symptom cluster of option b is the best descriptor.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Based on epidemiology, what would be the most likely condition for a 55-year-old man with a productive cough and a history of smoking?`,
        q2:``,
        q3:[],
        option: [`Acute bronchitis`,`Chronic bronchitis`,`Viral cough`,` Asthma`,`Postnasal drip`],
        answer:[2],
        ansText:`Rationale: A viral cause (c) should always be considered most likely although because this person is middle aged and has a history of smoking, bronchitis (a or b) is also likely and should be considered as the next most likely cause.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.16 to 2.21 concern the following conditions: `,
        q2:`Is characterized by night sweats?`,
        q3:[`Select, from A to E, which of the following conditions:`],
        option: [`Pneumonia`, `Heart failure`, `Tuberculosis (TB)`, `Chronic bronchitis`, `Laryngotracheobronchitis`],
        answer:[2],
        ansText:`Rationale: Associated symptoms with cough are useful in formulating a differential diagnosis. Pneumonia (A) shows signs of infection, heart failure (B) shortness of breath, chronic bronchitis (D) wheeze and breathlessness and croup (E) breathlessness. None show night sweats.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.16 to 2.21 concern the following conditions:` ,
        q2:`Has initially a nonproductive painful cough that progresses to a productive cough?`,
        q3:[`Select, from A to E, which of the following conditions:`],
        option: [`Pneumonia`, `Heart failure`, `Tuberculosis (TB)`, `Chronic bronchitis`, `Laryngotracheobronchitis`],
        answer: [0],
        ansText:`Rationale: Most coughs are productive or nonproductive from the outset. Heart failure (B), TB (C) and chronic bronchitis (D) are productive; croup (E) is nonproductive. Only pneumonia (A) from the listed conditions tends to change from nonproductive to productive`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.16 to 2.21 concern the following conditions: `,
        q2:`Is closely associated with a history of smoking?`,
        q3:[`Select, from A to E, which of the following conditions:`],
        option: [`Pneumonia`, `Heart failure`, `Tuberculosis (TB)`, `Chronic bronchitis`, `Laryngotracheobronchitis`],
        answer:[3],
        ansText:`Rationale: Croup (E) is a childhood condition; pneumonia (A) and TB (C) are infections; heart failure (B) is associated with old age. Chronic bronchitis (D) has a strong association with smoking.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.16 to 2.21 concern the following conditions:`,
        q2:`Is associated with a high-grade fever?`,
        q3:[` Select, from A to E, which of the following conditions:`],
        option: [`Pneumonia`, `Heart failure`, `Tuberculosis (TB)`, `Chronic bronchitis`, `Laryngotracheobronchitis`],
        answer: [0],
        ansText:`Rationale: Fever tends to suggest infection. From the above, only two conditions are infectious in origin, pneumonia (A) and TB (C). Of these, pneumonia often presents with a high fever.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.16 to 2.21 concern the following conditions:`,
        q2:`Has cough that is worst in the morning?`,
        q3:[` Select, from A to E, which of the following conditions:`],
        option: [`Pneumonia`, `Heart failure`, `Tuberculosis (TB)`, `Chronic bronchitis`, `Laryngotracheobronchitis`],
        answer:[3],
        ansText:`Rationale: Some coughs can exhibit worse symptoms at certain times of the day. From the listed conditions, this is true of chronic bronchitis (D) and croup (E). Croup shows worsening symptoms in the evening.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.16 to 2.21 concern the following conditions:`,
        q2:`Has a cough has a barklike quality?`,
        q3:[`Select, from A to E, which of the following conditions:`],
        option: [`Pneumonia`, `Heart failure`, `Tuberculosis (TB)`, `Chronic bronchitis`, `Laryngotracheobronchitis`],
        answer: [4],
        ansText:`Rationale: The sound of the cough is not normally helpful in establishing a diagnosis. However, for croup (E) the noise of the cough is characteristic and helpful in establishing the diagnosis`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.22 to 2.25 concern the following conditions:`,
        q2:`Causes least sedation when orally administered`,
        q3:[` Select, from A to E, which of the following conditions:`],
        option: [`Acrivastine`, `Loratadine`, `Chlorphenamine`, `Cetirizine`, `Antazoline`],
        answer:[1],
        ansText:`Rationale: Antazoline (E) is only available via the ocular route; chlorphenamine (C) is a first-generation antihistamine and causes sedation; this leaves the three second-generation antihistamines as options. All are less sedating than first-generation antihistamines but none are truly nonsedating. Of the three, loratadine (B) appears, from trial data, to be the least sedating..`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.22 to 2.25 concern the following medications:`,
        q2:`Is most likely to cause sedation?`,
        q3:[`Select, from A to E, which of the following medicines:`],
        option: [`Acrivastine`, `Loratadine`, `Chlorphenamine`, `Cetirizine`, `Antazoline`],
        answer:[2],
        ansText:`Rationale: As per the answer for question 2.22, chlorphenamine (C) is the correct option.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.22 to 2.25 concern the following medications: `,
        q2:`Is most suitable for a pregnant woman with nasal congestion?`,
        q3:[`Select, from A to E, which of the following medicines:`],
        option: [`Acrivastine`, `Loratadine`, `Chlorphenamine`, `Cetirizine`, `Antazoline`],
        answer:[2],
        ansText:`Rationale: Manufacturers advise against the use of second-generation antihistamines (options A, B and D). Antazoline (E) would not be used in nasal congestion.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.22 to 2.25 concern the following medications:`,
        q2:`Can be given to children from the age of 1 year old?`,
        q3:[`Select, from A to E, which of the following medicines:`],
        option: [`Acrivastine`, `Loratadine`, `Chlorphenamine`, `Chlorphenamine`, `Antazoline`],
        answer:[2],
        ansText:`Rationale: Acrivastine (A) and antazoline (E) are licensed for use in those from 12 years of age and loratadine (B) and cetirizine (D) from 2 years.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Which respiratory condition is characterized by shortness of breath and bronchoconstriction?`,
        q2:``,
        q3:[],
        option: [`Acute bronchitis`, `Asthma`, `Chronic bronchitis`, `Heart failure`, `Pneumonia`],
        answer:[1],
        ansText:`Rationale: Shortness of breath is rarely seen in acute bronchitis (a). All other options can show breathlessness but chronic bronchitis (c), heart failure (d) and pneumonia (e) do not normally exhibit bronchoconstriction.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `What course of action would be most appropriate if a baby was suffering with croup-like symptoms?`,
        q2:``,
        q3:[],
        option: [`Give the infant a cough suppressant`, `Give the infant an antihistamine`, `Put the infant into a steamy room`, `Seek medical help if symptoms persist for more than 48 hours`, `Take the infant to casualty`],
        answer:[3],
        
        ansText:`Rationale: Traditionally people advocated putting the child in a steamy room (c) but this is now not recommended. Treatment with cough remedies (a) and (b) will be ineffective. Symptoms, although distressing, rarely warrant direct referral to an emergency department (e).`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Which patient group is most at risk of pneumothorax?`,
        q2:``,
        q3:[],
        option: [`Children`, `Elderly men`, `Elderly women`, `Young men `, `Young women`],
        answer:[3],
        ansText:`Rationale: Epidemiological data show that young men (d)are more prone to pneumothorax but it is unknown why.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Which one of the following medicines can cause rebound congestion with overuse?`,
        q2:``,
        q3:[],
        option: [`Chlorphenamine tablets`, `Codeine linctus`, `Guaifenesin cough mixture`, `Oxymetazoline nasal spray`, `Pseudoephedrine tablets`],
        answer:[3],
        ansText:`Rationale: Sympathomimetics are known to have this effect (options d and e) but it only occurs with topical formulations d.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Which medicine is the drug of choice for nasal congestion caused by allergic rhinitis?`,
        q2:``,
        q3:[],
        option: [`Acrivastine`, `Chlorphenamine`, `Loratadine`, `Nasal beclometasone`, `Nasal decongestant`],
        answer:[3],
        ansText:`Rationale: All options will have a beneficial effect on symptoms; however, nasal decongestants (e) should be only used short-term. Antihistamines are effective but less so than corticosteroids in treating nasal symptoms.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Which patient group is most likely to suffer from infectious mononucleosis?`,
        q2:``,
        q3:[],
        option: [`Adolescents`, `Adults`, `Infants`, `Children`, `The elderly`],
        answer: [0],
        ansText:`Rationale: Glandular fever is most commonly seen in young adults as transmission is primarily through saliva (e.g. kissing).`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `What symptoms are commonly associated with acute rhinosinusitis?`,
        q2:``,
        q3:[],
        option: [`Dull, diffuse bilateral pain that is often worse on bending down`, `Dull, diffuse bilateral pain that often eases on bending down`, `Dull, localized unilateral pain that is often worse on bending down`, `Dull, localized unilateral pain that often eases on bending down`, `Sharp, localized bilateral pain that often eases on bending down`],
        answer:[2],
        ansText:`Rationale: Pain is dull, thus eliminating option e. It starts as unilateral pain (generally when someone would present to the pharmacy) and so options a and b can also be eliminated. Pain is worsened on bending down so option c is correct.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `The most likely cause of acute cough in children is:`,
        q2:``,
        q3:[],
        option: [`Asthma`, `Bacterial infection`, `Croup`, `Postnasal drip`, `Viral infection `],
        answer: [4],
        ansText:`Rationale: All possibilities can be seen in children. Croup (c) is specific to children but relatively uncommon. Asthma (a) has higher prevalence rates in children than adults but again is not very common. Postnasal drip (d) is usually a consequence of infection, of which viral (e) is by far the most common cause of cough.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Presenting symptoms of shortness of breath and dyspnoea are two symptoms most associated with?`,
        q2:``,
        q3:[],
        option: [`Asthma `, `Chronic bronchitis`, `Heart Failure`, `Pnemunia `, `Tuberculosis`],
        answer:[2],
        ansText:`Rationale: Dyspnoea (laboured breathing) is a relatively uncommon symptom associated with cough. Breathlessness can be seen in pneumonia, heart failure, chronic bronchitis and asthma. Although shortness of breath as well is most seen with asthma and heart failure, but cough would be expected to be a presenting symptom in asthma.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `In which group of patients should chlorphenamine be used with caution or avoided?`,
        q2:``,
        q3:[],
        option: [`People with asthma`, `People with epilepsy`, `People with hypertension`, `People with glaucoma`, `People with GORD`],
        answer:[3],
        ansText:`Rationale: Antihistamines have an anticholinergic effect and therefore need to be used with caution in glaucoma more than the other conditions listed.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Based on epidemiology, what would be the most likely condition for a 55-year-old man with productive cough with a history of smoking?`,
        q2:``,
        q3:[],
        option: [`Acute bronchitis`, `Asthma `, `Chronic bronchitis`, `Postnassal drip`, `Viral cough`],
        answer: [4],
        ansText:`Rationale: Smoking history will mean that chronic bronchitis (c) is a possibility in this age group but viral cough will still be the commonest cause of cough.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `In which patient group should flurbiprofen lozenges be avoided?`,
        q2:``,
        q3:[],
        option: [`Asthmatics`, `Patients with peptic ulcers`, `Hypertensive patients`, `Patients with moderate renal impairment`, `Patients with mild hepatic impairment`],
        answer:[1],
        ansText:`Rationale: Dosing adjustments are required in severe renal and liver impairment only and severe heart failure as well as in patients with active or history of recurrent peptic ulceration.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Which of the following medicines should only be given short-term for the relief of hayfever?`,
        q2:``,
        q3:[],
        option: [`Acrivastine`, `Beclometasone`, `Sodium cromoglicate`, `Naphazoline`, `Fluticasone`],
        answer:[3],
        ansText:`Rationale: Nasal steroids (b and e) need to be used regularly as does cromoglicate (c) to have any beneficial effect. Acrivastine (a) can be given intermittently or long term, but naphazoline (d), because of rebound effects, is limited to short-term use only.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Stephanie Bridges, who is 28 years old, asks for a cough medicine for her chesty cough. From the following symptoms, which one is most likely to make you refer the patient?`,
        q2:``,
        q3:[],
        option: [`Associated frontal headaches`, `Cough present for 10 days`, `Failure of symptoms to respond to guaifenesin`, `Occasional episodes of shortness of breath`, `Sputum that is green in colour`],
        answer:[3],
        ansText:`Rationale: Associated headaches with cough (a) is a relatively common symptom; duration (b) is classed as acute until 3 weeks has elapsed; failure to respond to treatment (c) doesn’t necessarily require referral, but reassessment of symptoms would be advisable; sputum colour (e) unless suggestive of haemoptysis is not a referral point. However, shortness of breath (d) needs further evaluation.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.15 to 2.17 concern the following condition:`,
        q2:`Shortness of breath is often the main presenting symptom`,
        q3:[`Select in which of the following conditions (A to E):`],
        option: [`Acute bronchitis`, `Chronic bronchitis`, `Heart failure`, `Pneumonia`, `Tuberculosis`],
        answer:[2],
        ansText:`Rationale: Heart failure is insidious in onset and does not usually present with cough as the first symptom if identified whilst still mild. The other conditions will generally present with cough as a major presenting symptom.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.15 to 2.17 concern the following conditions:`,
        q2:`Cigarette smoking is the main cause of the condition`,
        q3:[`Select in which of the following conditions (A to E):`],
        option: [`Acute bronchitis`, `Chronic bronchitis`, `Heart failure`, `Pneumonia`, `Tuberculosis`],
        answer:[1],
        ansText:`Rationale: Pneumonia (d) and tuberculosis (e) are bacterial in origin; heart failure (c) is due to left ventricular failure; acute bronchitis (a) is usually viral in origin. Chronic bronchitis (b) is associated strongly with a smoking history.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.15 to 2.17 concern the following conditions:`,
        q2:`A higher prevalence is seen in ethnic groups`,
        q3:[`Select in which of the following conditions (A to E):`],
        option: [`Acute bronchitis`, `Chronic bronchitis`, `Heart failure`, `Pneumonia`, `Tuberculosis`],
        answer: [4],
        ansText:`Rationale: Ethnicity does not usually effect prevalence of conditions associated with cough although a notable exception is tuberculosis with the majority of cases seen in people from the Indian subcontinent.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.18 to 2.20 concern the following medicines:`,
        q2:`Should be ideally avoided by patients taking beta-blockers?`,
        q3:[`Select, from A to E, which of the following medicines:`],
        option: [`Beclometasone`, `Benzydamine`, `Codeine`, `Pholcodine`, `Pseudoephedrine`],
        answer: [4],
        ansText:`Rationale: Pseudoephedrine has direct and indirect sympathomimetic activity and can increase systolic blood pressure but is much less potent than ephedrine.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.18 to 2.20 concern the following medicines:`,
        q2:`Is associated with illicit drug manufacture?`,
        q3:[`Select, from A to E, which of the following medicines:`],
        option: [`Beclometasone`, `Benzydamine`, `Codeine`, `Pholcodine`, `Pseudoephedrine`],
        answer: [4],
        ansText:`Rationale: Pseudoephedrine is structurally related to methamphetamine (crystal meth) and has been used as a base to manufacture it.`,
        state: `notAnswered`,
        userAnswered: []
    },
    {
        q: `Questions 2.18 to 2.20 concern the following medicines:`,
        q2:`Can reduce breast milk production?`,
        q3:[`Select, from A to E, which of the following medicines:`],
        option: [`Beclometasone`, `Benzydamine`, `Codeine`, `Pholcodine`, `Pseudoephedrine`],
        answer: [4],
        ansText:`Rationale: None of the medicines listed in their respective SmPCs state they cause a reduction in breast milk, but there are a number of reports and research papers that have linked sympathomimetics to causing a reduction in breast milk production.`,
        state: `notAnswered`,
        userAnswered: []
    }

];
