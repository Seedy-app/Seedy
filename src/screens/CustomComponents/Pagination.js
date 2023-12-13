import React from "react";
import styles from "../../config/CommonStyles";
import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <View style={styles.paginationContainer}>
        <IconButton
          icon="chevron-left"
          disabled={currentPage === 1}
          onPress={() => onPageChange(currentPage - 1)}
        />

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <Text
              key={page}
              style={currentPage === page ? styles.activePage : styles.page}
              onPress={() => onPageChange(page)}
            >
              {page}
            </Text>
          )
        )}

        <IconButton
          icon="chevron-right"
          disabled={currentPage === totalPages}
          onPress={() => onPageChange(currentPage + 1)}
        />
      </View>
    );
  };

  export default Pagination;