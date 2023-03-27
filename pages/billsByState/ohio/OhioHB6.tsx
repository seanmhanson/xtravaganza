// data
import Metadata from "@/data/billMetadata/ohioHB6";

// components
import BillHeader from "@/components/BillHeader";
import Quote from "@/components/Quote";

const OhioHB6 = () => {
  return (
    <div>
      <BillHeader metadata={Metadata} />
      <div>
        <h1 id="bill-overview">Bill Overview</h1>
        <h2 id="applicable-organizations">Applicable Organizations</h2>
        <Quote citation="§ 3313.5319.A" title="Applicable Schools">
          Each school that participates in athletic competitions or events
          administered by an organization that regulates interscholastic
          athletic conferences or events shall designate interscholastic
          athletic teams based on the sex of the participants [...]
        </Quote>
        <Quote citation="§ 3345.562.B" title="Applicable Colleges">
          Each state institution of higher education or private college that is
          a member of the national collegiate athletics association, the
          national association of intercollegiate athletics, or the national
          junior college association shall designate intercollegiate athletic
          teams and sports based on the sex [...]
        </Quote>
        <br />
        The following changes are applicable for:
        <ul>
          <li>
            schools (primary and secondary, public and private) participating in
            interscholastic compoetition or organizations
          </li>
          <li>
            public and private colleges participating in the NCAA, NAIA, or NJCA
          </li>
        </ul>
        Throughout this summary, we will refer to the sections referring to
        schools; the sections referring to colleges are virtually identical.
      </div>

      <div>
        <h2 id="divisions-and-restrictions">Divisions and Restrictions based on Sex</h2>
        <Quote citation="§ 3313.5319.A 1-3" title="Team Divisions by Sex">
          <div>
            1. Separate teams for participants of the female sex within female
            sports divisions;
          </div>
          <div>
            2. Separate teams for participants of the male sex within male sports
            divisions;
          </div>
          <div>
            3. If applicable, co-ed teams for participants of the female and male
            sexes within co-ed sports divisions.
          </div>
        </Quote>
        Teams must be divided by sex (as defined by the state), specifically
        into up to three teams:
        <ul>
          <li>male athletes</li>
          <li>female athletes</li>
          <li>an optional co-ed team</li>
        </ul>
        <Quote
          citation="§ 3313.5319.B-C"
          title="Restrictions on Male Sex Athletes"
        >
          <div>
            (B) No school, interscholastic conference, or organization that
            regulates interscholastic athletics shall knowingly permit individuals
            of the male sex to participate on athletic teams or in athletic
            competitions designated only for participants of the female sex.
          </div>
          <div>
            (C) Nothing in this section shall be construed to restrict the eligibility
            of any student to participate on any athletic teams or in athletic
            competitions that are designated as male or co-ed.
          </div>
        </Quote>
        <br />
        <div>
          The state restricts male athletes (as defined by the state) from
          participating on the female athletic teams.
        </div>
        <br />
        <div>
          No other enforcement applies to members of the female athletic or
          co-ed teams.
        </div>
      </div>

      <div>
        <h2 id="legal-actions">Permitted and Restricted Legal Actions</h2>
        <Quote
          citation="§ 3313.5319.D"
          title="Restriction on Complaints and Investigations"
        >
          No agency or political subdivision of the state and no accrediting
          organization or athletic association that operates or has business
          activities in this state shall process a complaint, begin an
          investigation, or take any other adverse action against a school or
          school district for maintaining separate single-sex interscholastic
          athletic teams or sports.
        </Quote>
        <Quote
          citation="§ 3313.5319.E.1"
          title="Actions for Direct/Indirect Harm of Athletes"
        >
          Any participant who is deprived of an athletic opportunity or suffers
          a direct or indirect harm as a result of a violation of this section
          has a private cause of action for injunctive relief, damages, and any
          other relief available against the school, school district,
          interscholastic conference, or organization that regulates
          interscholastic athletics.
        </Quote>
        <Quote
          citation="§ 3313.5319.E.2"
          title="Actions for Retaliation of Reporting"
        >
          Any participant who is subject to retaliation or other adverse action
          by a school, school district, interscholastic conference, or
          organization that regulates interscholastic athletics as a result of
          reporting a violation of this section has a private cause of action
          for injunctive relief, damages, and any other relief available against
          the entity that takes the retaliatory or other adverse action.
        </Quote>
        <Quote
          citation="§ 3313.5319.E.3"
          title="Actions for Direct/Indirect Harm of Schools"
        >
          Any school or school district that suffers any direct or indirect harm
          as a result of a violation of division (D) of this section has a
          private cause of action for injunctive relief, damages, and any other
          relief available against the agency, political subdivision,
          accrediting organization, or athletic association that violates that
          division.
        </Quote>
        <Quote
          citation="§ 3313.5319.F"
          title="Civil Actions for Other Damages and Harm"
        >
          Any civil action brought as a result of a violation of this section
          shall be initiated within two years after the date on which the
          violation occurs. Persons or organizations who prevail on a claim
          brought pursuant to this section shall be entitled to monetary
          damages, including for any psychological, emotional, or physical harm
          suffered, reasonable attorney&apos;s fees and costs, and any other
          appropriate relief.
        </Quote>

        <br />
        <div>
          State organizations and accrediting organizations operating business
          in Ohio may not file complaints or pursue investigations against
          schools enacting these restrictions.
        </div>
        <br />

        <div>
          Students may seek legal action against the schools or organizations if
          deprived of opportunity, seen as suffering harm, or in the case of
          suspected retaliation for reporting violations of these restrictions.
        </div>
        <br />

        <div>
          Individuals and organizations may file civil suits for monetary costs
          associated with psychological, emotional, and physical harm, as well
          as lost opportunities and other forms of relief.
        </div>
      </div>
    </div>
  );
};

export default OhioHB6;
