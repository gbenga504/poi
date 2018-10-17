import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Modal,
  StyleSheet,
  AsyncStorage,
  TouchableWithoutFeedback
} from "react-native";
import { Content, CheckBox } from "native-base";

import { BoldText, MediumText } from "../AppText";
import AppHeader from "../AppHeader";
import Icon from "../Icon";
import Fonts from "../../assets/Fonts";
import Button from "../Button";
import AppFab from "../AppFab";
import { projectEligbleUsers } from "../../api/assessment";

export default class ColleagueAddition extends React.PureComponent {
  state = {
    addedStudent: {},
    students: []
  };

  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onAddColleague: PropTypes.func.isRequired
  };

  async componentDidMount() {
    let { projectId } = this.props;
    const {
      data: { data: students }
    } = await projectEligbleUsers(projectId);

    if (students) {
      this.setState({
        students: students.map(std => ({
          name: std.name,
          matric_no: std.matric_number,
          id: std.id
        }))
      });
    }
  }

  setStudent = student => {
    if (this.state.addedStudent[student.matric_no]) {
      let _addedStudent = Object.keys(this.state.addedStudent).reduce(
        (acc, value) => {
          if (value != student.matric_no) {
            acc[matric_no] = student;
          }
          return acc;
        },
        {}
      );

      this.setState({
        addedStudent: _addedStudent
      });
    } else {
      this.setState({
        addedStudent: {
          ...this.state.addedStudent,
          [student.matric_no]: student
        }
      });
    }
  };

  addStudents = () => {
    if (Object.keys(this.state.addedStudent) <= 1) {
      alert("Cannot create a group having less than 1 student");
    } else {
      this.props.onAddColleague(this.state.addedStudent);
    }
  };

  renderCancelButton = () => (
    <Button onPress={this.props.onRequestClose}>
      <View style={styles.headerContainer}>
        <Icon
          name="md-arrow-back"
          type="ionic-icon"
          style={{ ...styles.headerButton, ...styles.cancel }}
        />
      </View>
    </Button>
  );

  render() {
    return (
      <Modal
        animationType="slide"
        visible={this.props.isVisible}
        onRequestClose={this.props.onRequestClose}
        transparent={true}
      >
        <View style={styles.inviteContainer}>
          <AppHeader left={this.renderCancelButton()} />
          <Content>
            <View style={styles.container}>
              {this.state.students.map((student, i) => (
                <TouchableWithoutFeedback
                  onPress={() => this.setStudent(student)}
                >
                  <View style={styles.section} key={i}>
                    <CheckBox
                      checked={
                        this.state.addedStudent[student.matric_no]
                          ? true
                          : false
                      }
                      style={{
                        marginRight: 20
                      }}
                      onPress={() => this.setStudent(student)}
                    />
                    <View styles={styles.nameContainer}>
                      <BoldText style={{ ...styles.text, ...styles.name }}>
                        {student.name}
                      </BoldText>
                      <MediumText style={styles.text}>
                        {student.matric_no}
                      </MediumText>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </Content>
          <AppFab
            name="md-arrow-forward"
            type="Ionicons"
            onPress={this.addStudents}
          />
        </View>
      </Modal>
    );
  }
}

const styles = {
  inviteContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerButton: {
    fontSize: Fonts.listHeaderSize,
    color: "#fff"
  },
  cancel: {
    fontSize: 25
  },
  section: {
    height: 100,
    paddingVertical: 12,
    paddingLeft: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#bdbdbd",
    flexDirection: "row",
    alignItems: "center"
  },
  nameContainer: {
    marginLeft: 30
  },
  text: {
    fontSize: 15
  },
  name: {
    color: "#000"
  }
};
